import { UserUpdatedDto } from './dto/user-payload.dto';
import { UserModel } from './users.schema';

export class UserService {
  static async getAll() {
    try {
      const users = await UserModel.find().exec();
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getBy(id: string) {
    try {
      const user = await UserModel.findById(id).exec();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const user = await UserModel.findByIdAndDelete(id).exec();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async updateBy(id: string, data: UserUpdatedDto) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, data, {
        new: true,
      }).exec();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
