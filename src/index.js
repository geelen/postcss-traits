import postcss from 'postcss'

export default (css, result) => {
  css.eachAtRule(rule => {
    if (rule.name == 'trait') {
      let expressions = rule.params.replace(/^\(|\)$/g, '').split(/, +/)
      expressions.forEach(expression => {
        let [trait, args] = expression.split(/: +/)
        rule.parent.insertBefore(rule, postcss.atRule({name: "mixin", params: trait, source: rule.source}))
        if (args) args.split(" ").forEach(arg => {
          rule.parent.insertBefore(rule, postcss.atRule({name: "mixin", params: `${trait}:${arg}`, source: rule.source}))
        })
      })
      rule.removeSelf()
    }
  })
}
