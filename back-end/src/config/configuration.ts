export default () => ({
    poetry: parseInt(process.env.PORT, 10) || 3000,
    secret: process.env.SECRET,
});
