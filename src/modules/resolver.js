import { fetch, fetchAll } from '../util/postgres.js'
import {
    USERS,
    INSERT_USER,
    INSERT_USER_SORTING,
    INSERT_USER_ABOUT,
    ACTIVE_USER,
    DISACTIVE_USER,
    SELECT_USER,
    DISSELECT_USER,
    STATISTICA,
    UPDATE_USER,
    UPDATE_USER_ABOUT,
    DELETE_USER
} from "./model.js"


export default {
    Query: {
        user: async (_, { key = null }) => await fetchAll(USERS, key),
        search: async (_, { key }) => {
            const users = await fetchAll(USERS, null)
            return await users.filter(user => user.full_name.toLowerCase().includes(key.toLowerCase()))
        },
        active_user: async () => await fetchAll(ACTIVE_USER),
        disactive_user: async () => await fetchAll(DISACTIVE_USER),
        selected: async () => await fetchAll(SELECT_USER),
        disselected: async () => await fetchAll(DISSELECT_USER),
        statistica: async () => {
            const [statistica] = await fetchAll(STATISTICA)
            return statistica
        }

    },
    Mutation: {
        insert: async (_, { full_name, user_name, new_password, confirm_password, email, bio }) => {
            try {
                if (new_password !== confirm_password) return 'new_password and confirm_password don\'t the same'
                const [{ user_id }] = await fetchAll(INSERT_USER, full_name, user_name, new_password)

                await fetchAll(INSERT_USER_SORTING, user_id)
                await fetchAll(INSERT_USER_ABOUT, user_id, email, bio)

                const [data] = await fetchAll(USERS, user_id)
                return {
                    message: 'User added successful',
                    data
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        update: async (_, { user_id, full_name, user_name, new_password, confirm_password, email, bio }) => {
            if (new_password !== confirm_password) return 'new_password and confirm_password don\'t the same'

            await fetchAll(UPDATE_USER, full_name, user_name, new_password, user_id)
            await fetchAll(UPDATE_USER_ABOUT, email, bio, user_id)

            const [data] = await fetchAll(USERS, user_id)

            return {
                message: 'User updated successful',
                data
            }
        },

        delete: async (_, { user_id }) => {
            console.log(user_id);
            await fetchAll(DELETE_USER, user_id)

            return 'User deleted successful'
        }
    }
}