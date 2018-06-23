import Goals from './index';
export default {
    Mutation: {
        createGoal(obj, { name, taskId }, { userId }) {
            if (!userId) {
                throw new Error('UnAuthorized');
            }

            const _id = Goals.insert({
                name,
                taskId,
                done: false,
            });
            return Goals.findOne(_id);
        },
        toggleGoal(obj, {_id}) {
            const goal = Goals.findOne({_id});

            Goals.update(_id, {
                $set: {
                    done: !goal.done,
                }
            });

            return Goals.findOne(_id);
        }
    }
}