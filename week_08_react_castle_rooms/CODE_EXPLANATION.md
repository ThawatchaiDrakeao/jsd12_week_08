# สรุปโค้ดโปรเจ็กต์ `week_08`



## โปรเจ็กต์นี้คืออะไร

โปรเจ็กต์นี้เป็นเกม React เล็ก ๆ ที่ให้ผู้เล่นสื่อสารกับ `Secret Room` เพื่อช่วย `Mewtwo` หนีออกมาจากปราสาท โดย flow หลักมีประมาณนี้

1. ผู้เล่นกรอกชื่อก่อนเริ่มเกม
2. ผู้เล่นพิมพ์ข้อความส่งเข้าไปในห้องลับ
3. ถ้าฝั่งห้องลับตอบกลับมาว่ามีคำว่า `help` ระบบจะปลดล็อกการเรียกเพื่อนมาช่วย
4. เมื่อเรียกเพื่อนแล้ว จะสามารถสร้าง `Escape Pod`
5. หลังจาก Pod สร้างเสร็จ จะมีปุ่มใน `SecretRoom` ให้กดพา Mewtwo หนีออกมาเป็นลำดับ
6. ตอนช่วยสำเร็จจะมี confetti ขึ้นมาเป็นเอฟเฟกต์ฉลอง

## ภาพรวมโครงสร้างไฟล์

โครงสร้างหลักอยู่ใน `src/`

- `main.jsx` เป็นจุดเริ่มต้นของแอป
- `App.jsx` เป็นไฟล์ที่คุม flow หลักของเกมเกือบทั้งหมด
- `contexts/messageContext/` เก็บ Context ที่ใช้แชร์ข้อความระหว่างคนนอกห้องกับคนในห้อง
- `components/01_Castle.jsx` ถึง `09_SecretRoom.jsx` เป็นโครงสร้างห้องซ้อนกันจากชั้นนอกสุดไปในสุด
- `examples/async/` เป็นไฟล์ตัวอย่างเรื่อง `async/await` ที่เก็บไว้ใช้เรียนรู้ ไม่ได้เป็นหัวใจของเกมหลัก

## ข้อมูลไหลยังไง

### 1. ข้อความระหว่าง Outside กับ Secret Room

- ค่า `question` คือข้อความที่คนข้างนอกพิมพ์ส่งเข้าไป
- ค่า `answer` คือข้อความที่ฝั่ง `SecretRoom` พิมพ์ตอบกลับ
- สองค่านี้ถูกเก็บไว้ใน `MessageProvider`
- `App.jsx` อ่านค่าเหล่านี้ผ่าน `MessageContext`
- `SecretRoom.jsx` รับค่าผ่าน props ต่อมาจาก component ชั้นบน ๆ

สรุปง่าย ๆ คือ ข้อมูลข้อความจริง ๆ ถูกเก็บกลางไว้ใน Context แล้ว `App` กับ `SecretRoom` มาใช้ข้อมูลชุดเดียวกัน

### 2. ชื่อผู้เล่น

- ชื่อผู้เล่นถูกเก็บใน `App.jsx` ด้วย state ชื่อ `playerName`
- หลังเริ่มเกม `App.jsx` จะเอาชื่อนี้ไปครอบด้วย `PlayerContext.Provider`
- ตอนนี้ในโค้ดที่ใช้งานจริง ยังไม่ได้มี component อื่นมา `useContext(PlayerContext)` ต่อ แต่โครงสร้างเตรียมไว้แล้ว เผื่ออนาคตอยากใช้ชื่อผู้เล่นใน component ลูกโดยไม่ต้องส่ง props ลงไป

### 3. ลำดับสถานะของเกม

ตัวแปร `gamePhase` ใน `App.jsx` เป็นตัวคุมสถานะหลักของเกม เช่น

- `idle` คือยังเริ่มช่วยไม่ได้
- `fetching` คือกำลังเรียกเพื่อนจาก API
- `reinforcements_ready` คือเพื่อนมาครบแล้ว
- `building` คือกำลังสร้าง Escape Pod
- `pod_built` คือ Pod สร้างเสร็จ
- `pod_in_room` คือเรียก Pod เข้ามาในห้องแล้ว
- `in_pod` คือ Mewtwo เข้าไปอยู่ใน Pod แล้ว
- `rescued` คือช่วยออกมาได้สำเร็จ

อ่านง่าย ๆ คือ `gamePhase` เป็นเหมือนสวิตช์บอกว่าเกมอยู่ขั้นตอนไหน เพื่อให้แต่ละส่วนรู้ว่าต้องแสดงอะไร

## อธิบายทีละไฟล์

### `src/main.jsx`

ไฟล์นี้คือจุดเริ่มต้นของ React app

- ใช้ `createRoot()` เพื่อ mount แอปลงใน `<div id="root">`
- import `index.css` เพื่อให้ style ทั้งโปรเจ็กต์ถูกโหลด
- เอา `<App />` ไปครอบด้วย `<MessageProvider>` เพื่อให้ component ข้างในทั้งหมดเข้าถึง `question`, `answer` และ handler ได้

สรุปคือไฟล์นี้ทำหน้าที่ต่อสายไฟให้แอปเริ่มทำงาน

### `src/App.jsx`

ไฟล์นี้เป็นหัวใจหลักของเกม

สิ่งที่ไฟล์นี้ทำ:

- เก็บ state หลักของเกม เช่น
  - `playerName`
  - `isGameStarted`
  - `helpReceived`
  - `rescuePokemon`
  - `gamePhase`
  - `podProgress`
  - `showBuildModal`
- ดึง `question`, `answer`, `handleQuestion`, `handleAnswer` มาจาก `MessageContext`
- แสดงหน้าเริ่มเกม ถ้ายังไม่ได้กรอกชื่อ
- แสดงหน้าเล่นเกม หลังเริ่มแล้ว
- เรียก API ไปดึงข้อมูล Pokemon ที่จะมาช่วย
- คุม progress bar ตอนสร้าง Escape Pod
- คุม confetti ตอนช่วยสำเร็จ

ฟังก์ชันสำคัญในไฟล์นี้:

- `handleStartGame`
  - กันไม่ให้ฟอร์ม reload หน้า
  - เช็กว่ากรอกชื่อหรือยัง
  - ถ้ากรอกแล้วค่อยเข้าเกม

- `handleCallReinforcements`
  - เปลี่ยนสถานะเป็น `fetching`
  - เรียก PokeAPI เพื่อเอาข้อมูล `bulbasaur`, `charmander`, `squirtle`
  - แปลงข้อมูลให้เหลือแค่ `name` กับ `sprite`
  - เก็บไว้ใน `rescuePokemon`

- `handleBuildPod`
  - รีเซ็ต progress กลับไปที่ `0`
  - เปิด modal
  - เปลี่ยนสถานะเป็น `building`

- `handleSecretRoomAction`
  - ใช้สำหรับปุ่มใน `SecretRoom`
  - ทุกครั้งที่กด จะเลื่อนเกมไปขั้นถัดไป

`useEffect` ในไฟล์นี้มี 3 ก้อนหลัก

1. ก้อนแรกคอยดู `answer`
   ถ้ามีคำว่า `help` จะปลดล็อกการเรียกเพื่อน

2. ก้อนที่สองคอยขยับ progress bar
   ถ้าอยู่ในสถานะ `building` ก็จะค่อย ๆ เพิ่มเปอร์เซ็นต์จนถึง 100

3. ก้อนที่สามคอยยิง confetti
   ทำงานเฉพาะตอน `gamePhase === "rescued"`

สรุปง่าย ๆ คือ `App.jsx` เป็นทั้งคนคุมเกม คนคุมข้อมูล และคนคุมหน้าจอหลัก

### `src/index.css`

ไฟล์นี้ใช้ตั้ง style พื้นฐานร่วมกันทั้งโปรเจ็กต์

- `@import "tailwindcss";` เปิดใช้ Tailwind
- ตั้ง `@layer base` เพื่อให้ `h1` และ `p` มีขนาดตัวอักษรและ spacing พื้นฐานเหมือนกัน

ข้อดีคือไม่ต้องเขียน style ซ้ำทุกไฟล์ โดยเฉพาะหัวข้อกับย่อหน้า

### `src/contexts/messageContext/MessageContext.jsx`

ไฟล์นี้สร้าง Context ด้วย `createContext()`

ตัวมันเองยังไม่ได้เก็บข้อมูลอะไร แต่เป็นเหมือน "กล่องกลาง" ที่เปิดไว้ให้ Provider ใส่ค่าเข้าไป และให้ component อื่นดึงค่าออกมาใช้

### `src/contexts/messageContext/MessageProvider.jsx`

ไฟล์นี้เป็นคนเก็บข้อมูลข้อความจริง ๆ

- มี state `question`
- มี state `answer`
- มี `handleQuestion` สำหรับอัปเดตข้อความจากฝั่ง outside
- มี `handleAnswer` สำหรับอัปเดตข้อความจากฝั่ง `SecretRoom`
- เอาค่าทั้งหมดส่งเข้า `MessageContext.Provider`

สรุปคือ ถ้าไม่มีไฟล์นี้ `App.jsx` กับ `SecretRoom.jsx` จะไม่มีที่เก็บข้อความร่วมกัน

### `src/contexts/messageContext/PlayerContext.jsx`

ไฟล์นี้สร้าง Context สำหรับชื่อผู้เล่น

- ตอนนี้ `App.jsx` ใช้ `PlayerContext.Provider` ครอบหน้าเกมไว้แล้ว
- แต่ใน component ลูกยังไม่ได้มีใครดึงค่าไปใช้จริง

สรุปคือไฟล์นี้เป็นโครงสร้างเผื่อขยายงานต่อในอนาคต

### `src/components/01_Castle.jsx`

ไฟล์นี้เป็นชั้นนอกสุดของปราสาท

- แสดงกรอบ `Castle`
- รับ props จาก `App.jsx`
- ส่ง props ทั้งหมดต่อให้ `Tower`

มันไม่ได้มี logic เกมของตัวเองมากนัก หน้าที่หลักคือเป็นโครง UI และเป็นตัวผ่าน props

### `src/components/02_Tower.jsx`

เหมือน `Castle.jsx`

- แสดงชั้น `Tower`
- รับ props แล้วส่งต่อไป `Chamber`

### `src/components/03_Chamber.jsx`

เหมือนชั้นก่อนหน้า

- แสดง `Chamber`
- ส่ง props ต่อไป `Room`

### `src/components/04_Room.jsx`

- แสดง `Room`
- ส่ง props ต่อไป `Hall`

### `src/components/05_Hall.jsx`

- แสดง `Hall`
- ส่ง props ต่อไป `Corridor`

### `src/components/06_Corridor.jsx`

- แสดง `Corridor`
- ส่ง props ต่อไป `Gallery`

### `src/components/07_Gallery.jsx`

- แสดง `Gallery`
- ส่ง props ต่อไป `Nook`

### `src/components/08_Nook.jsx`

- แสดง `Nook`
- ส่ง props ต่อไป `SecretRoom`

### สรุปภาพรวมของ `01` ถึง `08`

component ตั้งแต่ `Castle` ถึง `Nook` ทำหน้าที่หลัก 2 อย่าง

1. สร้างความรู้สึกเหมือนกำลังค่อย ๆ เข้าไปลึกในปราสาท
2. ส่ง props ต่อกันเป็นทอด ๆ จนถึง `SecretRoom`

รูปแบบนี้เรียกว่า `props drilling` เพราะข้อมูลต้องไหลผ่านหลายชั้นกว่าจะถึงปลายทาง

### `src/components/09_SecretRoom.jsx`

ไฟล์นี้คือปลายทางของเกม และเป็นจุดที่มี logic การช่วยเหลือชัดที่สุด

สิ่งที่ไฟล์นี้ทำ:

- รับข้อความ `question` ที่ส่งมาจาก outside
- รับ `answer` และ `handleAnswer` เพื่อให้คนในห้องพิมพ์ตอบกลับ
- รับ `vehicle`, `gamePhase`, `handleSecretRoomAction` เพื่อแสดงสถานะการช่วยเหลือ

logic สำคัญ:

- ถ้ายังไม่ช่วยสำเร็จ จะแสดง Mewtwo ถูกขังอยู่
- ถ้า `gamePhase === "pod_built"` จะขึ้นข้อความใบ้ว่ามีบางอย่างรออยู่ข้างนอก
- ถ้า Pod เข้ามาในห้องแล้ว จะโชว์รายชื่อ Pokemon ที่นั่งมาใน Pod
- ปุ่ม action จะเปลี่ยนข้อความตามสถานะเกม
  - `Call the Pod!`
  - `Enter the Pod!`
  - `Transport Outside!`
- ถ้าช่วยสำเร็จแล้ว จะเปลี่ยนข้อความเป็นห้องว่าง

สรุปง่าย ๆ คือไฟล์นี้คือ "ห้องปลายทาง" ที่ทำให้ผู้เล่นเห็นผลลัพธ์ของทุกอย่างที่ `App.jsx` คุมอยู่

### `src/examples/async/SimpleAsyncAwait.jsx`

ไฟล์นี้เป็นตัวอย่างพื้นฐานของการใช้ `async/await`

- ตอน component โหลด จะ fetch ข้อมูล Pokemon หมายเลข 1
- เอาชื่อมาแสดงบนหน้า
- ไม่มี `loading` และ `error` ที่ละเอียดมากนัก

เหมาะใช้ดูตัวอย่างเบื้องต้นว่าการ fetch ข้อมูลด้วย `useEffect` เขียนยังไง

### `src/examples/async/SimpleProAsyncAwait.jsx`

ไฟล์นี้เป็นเวอร์ชันที่ละเอียดกว่าไฟล์เมื่อกี้

- มี `loading`
- มี `error`
- มี `try/catch/finally`
- เช็ก `res.ok` ก่อนอ่าน JSON

เหมาะใช้เป็นตัวอย่างที่ใกล้ของจริงมากกว่า เพราะรองรับกรณี API พังหรือโหลดไม่สำเร็จ

## ไฟล์ package และเครื่องมือ

### `package.json`

ไฟล์นี้บอกว่าโปรเจ็กต์ใช้เครื่องมืออะไรบ้าง

- ใช้ `React`
- ใช้ `Vite`
- ใช้ `Tailwind CSS`
- ใช้ `canvas-confetti` สำหรับเอฟเฟกต์ตอนช่วยสำเร็จ

script ที่สำคัญ:

- `npm run dev` เปิด dev server
- `npm run build` build งานสำหรับ production
- `npm run lint` ตรวจรูปแบบโค้ด
- `npm run preview` เปิดดูไฟล์ build

## สรุปแบบสั้นมาก

ถ้าจะอธิบายโปรเจ็กต์นี้ในประโยคเดียว:

`App.jsx` เป็นคนคุมเกมทั้งหมด, `MessageProvider` เป็นที่เก็บข้อความกลาง, component `Castle -> SecretRoom` เป็นเส้นทางส่งข้อมูลลงไปจนถึงห้องลับ, และ `SecretRoom.jsx` เป็นจุดที่ทำให้ผู้เล่นเห็นผลของการช่วยเหลือจริง ๆ

## ถ้าจะอ่านโค้ดต่อ ควรเริ่มจากตรงไหน

ลำดับที่แนะนำสำหรับคนเปิดอ่านใหม่

1. อ่าน `src/main.jsx` เพื่อดูว่าแอปเริ่มยังไง
2. อ่าน `src/App.jsx` เพื่อเข้าใจ flow หลักของเกม
3. อ่าน `src/contexts/messageContext/MessageProvider.jsx` เพื่อเข้าใจว่า message ถูกเก็บยังไง
4. อ่าน `src/components/09_SecretRoom.jsx` เพื่อดูปลายทางของ interaction
5. ค่อยย้อนกลับมาดู `01_Castle.jsx` ถึง `08_Nook.jsx` เพื่อเข้าใจเส้นทางของ props

