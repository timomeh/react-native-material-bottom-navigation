// Customized version of
// https://github.com/OriR/react-docgen-markdown-renderer

const path = require('path')
const os = require('os')
const process = require('process')
const handlebars = require('handlebars')

const getType = obj => {
  if ((obj.type || {}).name === 'custom') {
    return { name: obj.type.raw }
  }

  return obj.type && typeof obj.type.name === 'string'
    ? obj.type
    : typeof obj.name === 'string' ? obj : undefined
}

const defaultPropBody = text => {
  const lines = text.split(/\r\n|\r|\n/g)
  return new handlebars.SafeString(
    lines.length > 1 ? ` \n\`\`\`js\n${text}\n\`\`\`` : `\`${text}\``
  )
}

handlebars.registerPartial('Unknown', 'Unknown')

handlebars.registerPartial('func', 'Function')
handlebars.registerPartial('array', 'Array')
handlebars.registerPartial('object', 'Object')
handlebars.registerPartial('string', 'String')
handlebars.registerPartial('number', 'Number')
handlebars.registerPartial('bool', 'Boolean')
handlebars.registerPartial('node', 'ReactNode')
handlebars.registerPartial('element', 'ReactElement')
handlebars.registerPartial('any', '*')
handlebars.registerPartial('custom', 'custom')
handlebars.registerPartial('shape', 'Shape')
handlebars.registerPartial('ViewPropTypes.style', 'ViewPropTypes.style')
handlebars.registerPartial('Text.propTypes.style', 'Text.propTypes.style')

handlebars.registerPartial(
  'arrayOf',
  'Array[]<{{#with (typeObject this)}}{{> (typePartial value) value}}{{/with}}>'
)
handlebars.registerPartial(
  'objectOf',
  'Object[#]<{{#with (typeObject this)}}{{> (typePartial value) value}}{{/with}}>'
)
handlebars.registerPartial(
  'instanceOf',
  '{{#with (typeObject this)}}{{value}}{{/with}}'
)
handlebars.registerPartial(
  'enum',
  'Enum({{#with (typeObject this)}}{{#each value}}{{{this.value}}}{{#unless @last}},{{/unless}}{{/each}}{{/with}})'
)
handlebars.registerPartial(
  'union',
  'Union<{{#with (typeObject this)}}{{#each value}}{{> (typePartial this) this}}{{#unless @last}} | {{/unless}}{{/each}}{{/with}}>'
)

handlebars.registerHelper('typeObject', getType)
handlebars.registerHelper('defaultPropBody', defaultPropBody)

handlebars.registerHelper('typePartial', function(type) {
  const partials = [
    'any',
    'array',
    'arrayOf',
    'bool',
    'custom',
    'element',
    'enum',
    'func',
    'node',
    'number',
    'object',
    'string',
    'union',
    'instanceOf',
    'objectOf',
    'shape',
    'ViewPropTypes.style',
    'Text.propTypes.style'
  ]
  const typeObj = getType(type)
  return typeObj && partials.includes(typeObj.name) ? typeObj.name : 'Unknown'
})

const defaultTemplate = `
## {{componentName}}

{{#if srcLink }}From [\`{{srcLink}}\`]({{srcLink}}){{/if}}

{{#if description}}{{{description}}}{{/if}}

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
{{#each props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{#if isMissingComposes}}
*Some or all of the composed components are missing from the list below because a documentation couldn't be generated for them.
See the source code of the component for more information.*
{{/if}}

{{#if composes.length}}
{{componentName}} gets more \`propTypes\` from these composed components
{{/if}}

{{#each composes}}
#### {{this.componentName}}

prop | type | default | required | description
---- | :----: | :-------: | :--------: | -----------
{{#each this.props}}
**{{@key}}** | \`{{> (typePartial this) this}}\` | {{#if this.defaultValue}}\`{{{this.defaultValue}}}\`{{/if}} | {{#if this.required}}:white_check_mark:{{else}}:x:{{/if}} | {{#if this.description}}{{{this.description}}}{{/if}}
{{/each}}

{{/each}}
`

let typeFlatteners = {}

const replaceNewLine = value => value.replace(new RegExp(os.EOL, 'g'), ' ')
const normalizeValue = (value, hasInnerValue) =>
  value ? (hasInnerValue ? value.value : value) : value

const flattenProp = (seed, currentObj, name, isImmediateNesting) => {
  const typeObject = getType(currentObj)

  if (typeObject) {
    const flattener = typeFlatteners[typeObject.name] || (() => {})
    flattener(seed, typeObject, name)
  }

  if (!isImmediateNesting) {
    seed[name] = Object.assign({}, currentObj, {
      description: normalizeValue(currentObj.description, false),
      defaultValue: normalizeValue(currentObj.defaultValue, true)
    })
  }
}

typeFlatteners = {
  arrayOf(seed, arrayType, name) {
    flattenProp(seed, arrayType.value, name + '[]', true)
  },
  shape(seed, shapeType, name) {
    Object.keys(shapeType.value).forEach(inner => {
      flattenProp(seed, shapeType.value[inner], name + '.' + inner)
    })
  },
  objectOf(seed, objectOfType, name) {
    flattenProp(seed, objectOfType.value, name + '[#]', true)
  }
}

const flattenProps = props => {
  const sortedProps = {}
  if (props) {
    const flattenedProps = Object.keys(props).reduce((seed, prop) => {
      flattenProp(seed, props[prop], prop)
      return seed
    }, {})

    Object.keys(flattenedProps)
      .sort()
      .forEach(key => {
        sortedProps[key] = flattenedProps[key]
      })
  }

  return sortedProps
}

class ReactDocGenMarkdownRenderer {
  constructor(options) {
    this.options = Object.assign(
      {
        componentsBasePath: process.cwd(),
        template: defaultTemplate
      },
      options
    )

    this.template = handlebars.compile(this.options.template)
    this.extension = '.md'
  }

  render(file, docs, composes) {
    const componentName = path.basename(file, path.extname(file))

    const sortedProps = flattenProps(docs.props)

    const composesFlattened = []
    if (composes.length !== 0) {
      composes.forEach(compose => {
        composesFlattened.push({
          srcLink: compose.file.replace(
            this.options.componentsBasePath + '/',
            ''
          ),
          componentName: compose.displayName,
          props: flattenProps(compose.props)
        })
      })
    }

    return this.template({
      componentName,
      srcLink: file.replace(this.options.componentsBasePath + '/', ''),
      description: docs.description,
      isMissingComposes: (docs.composes || []).length !== composes.length,
      props: sortedProps,
      composes: composesFlattened
    })
  }
}

module.exports = ReactDocGenMarkdownRenderer
