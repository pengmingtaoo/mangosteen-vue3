const map: Record<string, string> = {//映射
  'is invalid' : ''
}

export const getFriendlyError = (error: string) => {//接收字符串
  console.log(error)
  return map[error] || error 
}