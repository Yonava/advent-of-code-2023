const { dayNineteen, dayNineteenSm } = require('./inputs')

const parseWorkflow = (str) => {
  const [name, logic] = str.split('{')
  const ins = logic.slice(0, -1).split(',')
  const otherwise = ins.pop()
  const conditions = ins.map(i => i.split(':'))

  return { name, fn: obj => conditions.find(([cond]) => eval(`obj.${cond}`))?.[1] ?? otherwise }
}

const parseObj = (str) => str.slice(1, -1).split(',').reduce((acc, curr) => {
  acc[curr[0]] = parseInt(curr.slice(2))
  return acc
}, {})

const [workflows, objs] = dayNineteen.split('\n\n').map((inp, i) => inp.split('\n').map((str) => {
  return i ? parseObj(str) : parseWorkflow(str)
}))

const figureOut = (obj, wf = workflows.find(({ name }) => name === 'in')) => {
  const res = wf.fn(obj)
  if (res === 'A') return true
  else if (res === 'R') return false
  return figureOut(obj, workflows.find(({ name }) => name === res))
}

const out = objs
  .filter((obj) => figureOut(obj))
  .reduce((acc, curr) => acc + Object.values(curr).reduce((sum, num) => sum + num), 0)

console.log(out)