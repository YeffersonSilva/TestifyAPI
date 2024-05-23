const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    return res.status(200).send(users)
})

router.get('/:id', (req, res) => {    
    if (req.params.id === 'U0001') {

        return res.status(200).json('user found') 
    }

    return res.status(404).json('user not found')

})

router.post('/', (req, res) => {    

    const { usermame, password } = req.body
    if(usermame && password) {
        return res.status(201).json('user created')
    }   
    return res.status(400).json('user not created')
}   )
   
exports.router = router