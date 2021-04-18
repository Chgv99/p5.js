let boxes=[]
let s=8
let d=11
let sp=400
let a=0
let w
function setup(){
createCanvas(650,650,WEBGL)
for(let i=0;i<s;i++){boxes[i]=[]
for(let j=0;j<s;j++){boxes[i][j]=new Box(-(s/2)*sp+sp*(j%s)+sp/2,-(s/2)*sp+sp*(i%s)+sp/2,0,0)}}colorMode(HSL,360);}
class Box {
constructor(x,y,z,rx){
this.x=x
this.y=y
this.z=z
this.rx=rx
this.r=360}
waveColor(){
this.h=map(sin(radians((sp*s/2)-this.y)/6),-1,1,0,360);
this.b= map(abs(this.y),0,(s/2)*sp+sp/2,300,0);}
setColor(h){
this.h=h}
move(x,y,z,rx){
this.x=this.x+x
this.y=this.y+y
this.z=this.z+z
this.rx=this.rx+rx
if(this.y>sp*s/2){this.y=-sp*s/2}
if(this.y<-sp*s/2){this.y=sp*s/2}}
draw(x,y,z,rx,d){
if(!x)x=this.x
if(!y)y=this.y
if(!rx)rx=this.rx
push()
this.waveColor()
stroke(0)
fill(this.h,360,this.b/d*0.5)
translate(x,y,z)
rotateX(radians(rx))
box(100,100)
pop()}}
function draw(){
background(0);
a++;
rotateZ(-radians(a/8));
for(let i=0;i<s;i++){
for(let j=0;j<s;j++){
boxes[i][j].move(0,1.5,0,sin(1/2))
for(let k=1;k<d;k++) {
boxes[i][j].draw(null,null,-(k-1)*sp,null,k)}}}}