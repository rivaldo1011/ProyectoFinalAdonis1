// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import 'App/Models/User'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
export default class AuthController {
    public async Login({auth,request,response})
    {
        const email=request.input('email')
        const password=request.input('password')
        try{
            const user=await User
            .query()
            .where('email',email)
            .where('password',password)
            .firstOrFail()
            const token=auth.use('api').generate(user)
            return token
        }catch
        {
            return response.badRequest('Credenciales Invalidas')
        }
    }
    public async register({request,response}){
        const validations= await schema.create({
            email:schema.string({},[
               rules.email(),
               rules.unique({table:'users',column:'email'})
            ]),
            password:schema.string(),
    
        })
        const data=await request.validate({schema:validations})
        const user=await User.create(data)
        return response.created(user);
    }
    public async Logout({auth,response})
    {
        try
        {
            await auth.use('api').authenticate()
            await auth.use('api').revoke()
            return true
        }catch{
            return response.badRequest('No existe el usuario')
        }
    }
    public async VerificarToken({auth})
    {
        try
        {
            await auth.use('api').authenticate()
            return true
        }catch
        {
            return false
        }
    }
    public async getUser({auth})
    {
        await auth.use('api').authenticate()
        const user=auth.use('api').user.$attributes
        return user
    }
}