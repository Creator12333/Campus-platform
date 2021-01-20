const formatTime=data =>{
  const year=data.getFullYear()
  const month=data.getMonth()+1
  const day=data.getDate()
  const hour=data.getHours()
  const minute=data.getMinutes()
  const second=data.getSeconds()
  
  return [year,month,day].map(formatNumber).join('-')+' '+[hour,minute,second].map(formatNumber).join(':')
}
const formatNumber=n=>{
  n=n.toString()
  return n[1] ? n:'0'+n
}
module.exports={
  formatTime:formatTime
}