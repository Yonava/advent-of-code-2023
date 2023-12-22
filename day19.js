const { dayNineteen, dayNineteenSm } = require('./inputs')

const parseWorkflow = (str) => {
  const [name, logic] = str.split('{')
  const ins = logic.slice(0, -1).split(',')
  const res = ins.pop()
  const process = ins.map(i => {
    const [des, sendTo] = i.split(':')
    return {
      logic: { prop: des[0], op: des[1], num: parseInt(des.slice(2)) },
      sendTo
    }
  })

  const fn = (obj) => {
    for (const { logic, sendTo } of process) {
      const { prop, op, num } = logic
      switch (op) {
        case '>':
          if (obj[prop] > num) return sendTo
          break
        case '<':
          if (obj[prop] < num) return sendTo
          break
        default:
          throw new Error('Operation Not Accounted For!')
      }
    }
    return res
  }

  return {
    name,
    fn,
  }
}

const parseObj = (str) => {
  return str.slice(1, -1).split(',').reduce((acc, curr) => {
    acc[curr[0]] = parseInt(curr.slice(2))
    return acc
  }, {})
}

const [workflows, objs] = dayNineteen.split('\n\n').map((inp, i) => inp.split('\n').map((str) => {
  return i ? parseObj(str) : parseWorkflow(str)
}))

const intakeWorkflow = workflows.find(({ name }) => name === 'in')

const figureOut = (obj, wf) => {
  if (wf.fn(obj) === 'A') return true
  else if (wf.fn(obj) === 'R') return false
  return figureOut(obj, workflows.find(({ name }) => name === wf.fn(obj)))
}

const accepted = objs.filter((obj) => figureOut(obj, intakeWorkflow))

const out = accepted.reduce((acc, curr) => acc + Object.values(curr).reduce((sum, num) => sum + num), 0)

console.log(out)