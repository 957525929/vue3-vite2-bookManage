import $http from "./index.js";

//mock测试
export const getTest = () => $http.get("/api/test");

//登录
export const login = (params) => $http.post("/cms/user/login", params);

//查询自己信息
export const getInfo = () => $http.get("/cms/user/information");

//查询所有日志
export const getLog = () => $http.get("cms/log");

//拼接数据
const getParams = (v) => {
  let res = "";
  for (let i in v) {
    res = res + "&" + i + "=" + v[i];
  }
  res = "?" + res.slice(1);
  return res;
};
//日志搜索
export const searchLog = (params) => {
  let url = getParams(params);
  return $http.get("cms/log/search" + url);
};
//新增书籍
export const addBook = (params) => $http.post("/v1/book", params);
//获取所有书籍
export const getBookList = () => $http.get("/v1/book");
//获取书籍详情
export const getDetailList = (params) => $http.get("/v1/book/" + params);
//更新书籍
export const updateBookList = (id, params) => {
  return $http.put("/v1/book/" + id, params);
};
//删除书籍
export const deleteBook = (id) => {
  return $http.delete("/v1/book/" + id);
};
//查询所有用户
export const getUsersList = (params) => {
  let url = getParams(params);
  return $http.get("/cms/admin/users" + url);
};
//查询所有权限组
export const getUsersGroup = () => $http.get("/cms/admin/group/all");
//注册用户
export const register = (params) => $http.post("/cms/user/register", params);
//删除用户
export const deleteUser = (id) => {
  return $http.delete("/cms/admin/user/" + id);
};
//管理员更新用户信息
export const updateUsers = (url, params) => $http.put("/cms/admin/user/" + url, params);
//修改用户密码
export const updatePassword = (url, params) => $http.put("/cms/admin/user/" + url + "/password", params);
//查询所有日志
export const updatePassword = () => $http.put("/cms/log" + url + "/password", paras);
