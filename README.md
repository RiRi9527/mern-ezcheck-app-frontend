# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


-----------------------------

Problem I solved:

----:
type AppContext = {
  isLoggedIn: boolean;
  auth: User | undefined;
};

auth can be undefined; it will crash due to page refresh. So when I use content, I need to put a '?' after 'auth' like this
  const disable =
    auth?.position !== "CEO" && auth?.position !== "Office Manager";


----:

When the frontend sends a request to the backend, the JSON file is not successfully transmitted

     headers: {
        "Content-Type": "application/json",
      },

 need to add this line of code to ensure that the JSON file is transmitted successfully.

 -----:
 
 In React, when you use useState to store data returned by fetch, you may encounter the issue of data being empty during the initial rendering. This is because fetch is an asynchronous operation that takes some time to complete, and the component has already started rendering before it completes.

The common solution to this problem is to initiate the data request after the component has been rendered and update the state when the data arrives. You can achieve this using the useEffect hook. This ensures that the data is fetched after the component has been rendered, avoiding the issue of empty data during the initial render.

 

 Problem need to be solved:


---：How to find the correct event to update during checkout


 





