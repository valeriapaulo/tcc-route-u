/*
store   => Cadastrar / Adicionar
index   => Listar vários
show    => Listar apenas UM
update  => Atualizar
delete  => Deletar
*/

import { v4 } from 'uuid'
import * as Yup from 'yup'

import User from  '../models/User'

class UserController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required(6),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { name, email, password } = request.body

        const userExists = await User.findOne({
            where: { email },
        })

        if(userExists){
            return response.status(409).json({ error: 'Usuário já existe'})
        }

        console.log(userExists)

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
        })

        return response.status(201).json({ id: user.id, name, email })
    }
}

export default new UserController()