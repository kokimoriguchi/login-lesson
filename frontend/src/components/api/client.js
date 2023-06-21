import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

// optionsオブジェクトは、applyCaseMiddleware関数に渡すオプションを指定するためのもの。
// HTTPリクエストとレスポンスのヘッダーのキーの大文字と小文字の区別が無視されます。
const options = {
  ignoreHeaders: true,
};

const client = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3001",
  }),
  options
);

export default client;
