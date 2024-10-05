function TimeConvat(time){
  const hour=parseInt(time/3600)
  const recovariSecone=time % 3600;
  const minit=parseInt(recovariSecone/60)
  const secone=recovariSecone % 60;
  console.log(`hours: ${hour} minute: ${minit} second:${secone}`)
}
TimeConvat(6000)