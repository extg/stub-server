
import casual from 'casual'

const user = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send({
    id: 2,
    name: 'Knox Holmes',
    email: casual.email,
    phone: '+1 (950) 413-2615',
    address: '812 Williams Place, Wattsville, Kansas, 9765',
    registered: '2014-03-21T10:55:17 -03:00'
  })
}

export default user
