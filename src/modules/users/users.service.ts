import { UserUpdatedDto } from './dto/user-payload.dto';
import { UserSchema } from './users.schema';

export class UserService {
  static async getAll() {
    try {
      const users = await UserSchema.find().exec();
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async getBy(id: string) {
    try {
      const user = await UserSchema.findById(id).exec();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async delete(id: string) {
    try {
      const user = await UserSchema.findByIdAndDelete(id).exec();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async updateBy(id: string, data: UserUpdatedDto) {
    try {
      const user = await UserSchema.findByIdAndUpdate(id, data, {
        new: true,
      }).exec();
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
