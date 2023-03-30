import { jsoup } from "@/common/util/jsoup"

export function getSuggestion(keyword) {
  return jsoup('https://suggestion.baidu.com/su', {
    wd: keyword ? String(keyword) : ' '
  })
}