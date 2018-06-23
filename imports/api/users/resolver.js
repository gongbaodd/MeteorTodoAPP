export default {
    Query: {
        user: (obj, arg, { user }) => {
            return user || null;
        }
    },
    User: {
        email: ({ emails }) => {
            return emails[0].address;
        }
    }
}