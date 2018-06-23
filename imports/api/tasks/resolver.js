import tasks, { Tasks } from './index';
import Goals from '../goals';

export default {
    Query: {
        tasks(obj, args, { userId }) {
            return Tasks.find({ userId });
        }
    },

    Task: {
        goals ({ _id }) {
            const goals = Goals.find({
                taskId: _id,
            });
            return goals;
        },

        done ({_id}) {
            const goals = Goals.find({
                taskId: _id,
            }).fetch();

            if (!goals.length) {
                return false;
            }

            return goals.map(({ done }) => done)
                        .reduce((a, b) => a && b, true);
        }
    },

    Mutation: {
        createTask(obj, { name }, { userId }) {
            if (userId) {
                const taskId = Tasks.insert({
                    name,
                    userId,
                });
                return Tasks.findOne(taskId);
            }
            throw new Error('Unauthorized');
        }
    },
};