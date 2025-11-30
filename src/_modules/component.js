export const importView = (component) => {
    return () => import(`../views/${component}.js`);
};
export const importComponent = (component) => {
    return () => import(`../components/${component}.js`);
};
export const importService = (service) => {
    return () => import(`../services/${service}.js`);
};
export const importModel = (model) => {
    return () => import(`../models/${model}.js`);
};