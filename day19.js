const input =
`px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`


const parseWorkflow = (str = 'qqz{s>2770:qs,m<1801:hdj,R}') => {
  const [callSign, logic] = str.split('{')
  const ins = logic.slice(0, -1).split(',')
  const res = ins.pop()
  return {
    name: callSign,
    fn: ins.map(i => {
      const [des, sendTo] = i.split(':')
      return {
        logic: { var: des[0], op: des[1], num: parseInt(des.slice(2)) },
        sendTo
      }
    }),
    res
  }
}

const parseObj = (str = '{x=787,m=2655,a=1222,s=2876}') => {
  return str.slice(1, -1).split(',').reduce((acc, curr) => {
    acc[curr[0]] = parseInt(curr.slice(2))
    return acc
  }, {})
}

const [rawWorkflows, rawObjs] = input.split('\n\n').map((inp, i) => inp.split('\n').map((str) => {
  return i ? parseObj(str) : parseWorkflow(str)
}))

console.log(rawWorkflows, rawObjs)