import assert from "assert"
import postcss from "postcss"
import traits from "../src"

let processor = postcss([traits]),
  check = (desc, input, expected) => {
    it(desc, () => {
      assert.equal(processor.process(input).css, expected)
    })
  }

describe("@trait", () => {
  check(
    "it should work with a key only",
    "a { @trait(b); }",
    "a { @mixin b; }"
  )

  check(
    "it should work with two keys",
    "a { @trait(b, c); }",
    "a { @mixin b; @mixin c; }"
  )

  check(
    "it should work with one value",
    "a { @trait(b: one, c); }",
    "a { @mixin b; @mixin b:one; @mixin c; }"
  )

  check(
    "it should work with many value",
    "a { @trait(b: one 2 three-and-a-half, c: 4 4½); }",
    "a { @mixin b; @mixin b:one; @mixin b:2; @mixin b:three-and-a-half; @mixin c; @mixin c:4; @mixin c:4½; }"
  )
})
