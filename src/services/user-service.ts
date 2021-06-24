import { User, UserSocial } from "../models"
import { Singleton } from "typescript-ioc"
import { Service, IService, ServiceError } from "./Service"

export abstract class IUserService extends IService {
  abstract signIn(email: string, password: string): any
  abstract signUp(user: any): any
  abstract getUserSocial(id: string): any
}

@Singleton
export class UserService extends Service implements IUserService {
  constructor() {
    super(User)
  }
  
  async getUserSocial(id: string) {
    const resp =  await UserSocial.find({
      user: id
    })

    if(!resp) throw new ServiceError("Something wont wrong!")

    return resp
  }

  async signUp(user: any) {
    const resp = await User.findOne({
      email: user.email,
    })

    if (resp !== null) throw new ServiceError("This user exist please try again")

    const new_user = await User.create(user)
    delete new_user._doc.password
    if (!new_user) throw new ServiceError("Something wont wrong!")
    
    return new_user
  }

  async signIn(email: string, password: string) {
    //check if user in database
    const user = await User.findOne({
      email: email,
    })

    if (!user) {
      throw new ServiceError("Invalid email/password")
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) throw new ServiceError("Invalid email/password")
    delete user._doc.password
    return user
  }
}
