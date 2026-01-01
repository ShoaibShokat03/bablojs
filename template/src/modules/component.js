export const importLazy = (path) => {
    path = path.endsWith('.js') ? path : `${path}.js`;
    return () => import(`${path}`);
};
export const importView = (component) => {
    component = component.endsWith('.js') ? component : `${component}.js`;
    return () => import(`../views/${component}`);
};
export const importComponent = (component) => {
    component = component.endsWith('.js') ? component : `${component}.js`;
    return () => import(`../components/${component}`);
};
export const importService = (service) => {
    service = service.endsWith('.js') ? service : `${service}.js`;
    return () => import(`../services/${service}`);
};
export const importModel = (model) => {
    model = model.endsWith('.js') ? model : `${model}.js`;
    return () => import(`../models/${model}`);
};