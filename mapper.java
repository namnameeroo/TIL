<구글설문지 >
1. 서버에서 정보가져와서 화면에 표시
- 메인 첫화면 띄우는거랑
- 제출버튼
    -> 문항, 문항마다 딸린 보기, 사용자가 입력한값
    -> a => [1, 가, img, 123, img]
    -> 문항유형 => 단답식/ 객관식/ 순위형/ 파일형/ 날짜형 (시간)
    -> user_input = [1,2,3]
    -> 파일형
    별도의 저장공간 [file upload, name변경]
    user_input = name변경

questions = [1,2,3,4,5,6,7,8]
for q :
   1 .
   2 . 4 promise.fileUpload
       .5 then
   3 .

4 response = [user_input의 집합]
5 ajax
6 DB 


promise (_1_)
.then(_)
.then(_)
.catch(_)


questions = [1,2,3,4,5,6,7,8]
promise
    for q :
    1 .
    2 . promise.fileUpload
      . then
    3 .

    response = [user_input의 집합]
then
    5 ajax
    6 DB