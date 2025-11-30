export const importLazy = (path) => {
    path = path.endsWith('.js') ? path : `${path}.js`;
    return () => import(`${path}.js`);
};
export const importView = (component) => {
    component = component.endsWith('.js') ? component : `${component}.js`;
    return () => import(`../views/${component}.js`);
};
export const importComponent = (component) => {
    component = component.endsWith('.js') ? component : `${component}.js`;
    return () => import(`../components/${component}.js`);
};
export const importService = (service) => {
    service = service.endsWith('.js') ? service : `${service}.js`;
    return () => import(`../services/${service}.js`);
};
export const importModel = (model) => {
    model = model.endsWith('.js') ? model : `${model}.js`;
    return () => import(`../models/${model}.js`);
};