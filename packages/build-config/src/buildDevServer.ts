import type { Configuration as DevServerConfiguration } from "webpack-dev-server"
import {BuildOptions} from "./types/types";

export function buildDevServer (options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: true,
    historyApiFallback: true, // эта настройка позволяет в рамказ одного html за счет JS работать роутингу, не выбрасывая 404 ошибку
    hot: true
  }
}