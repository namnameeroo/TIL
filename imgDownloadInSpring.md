# (외부폴더의) 이미지 다운로드, spring mapping

관련 태그: HTML, JAVA, SPRING, tomcat
작성일: December 26, 2021 10:18 PM

- **주의할 점:**
    
    xml 설정 파일은 tomcat 내부 (서버 전체에 영향, 서버 기본 설정)에도 있고, 프로젝트 내부에도 존재하기 때문에 경로보고 잘 찾아야 한다.
    
    또한, 똑같이 매핑의 역할을 하는 파일들이어도 거치는 순서가 다르기 때문에 어떤 단계에서 매핑할지 단계를 잘 지키면서 해야 의도하는 대로 경로가 설정된다. (집에 잘 찾아간다)
    
- **1 TRY** : server.xml 에 주소 매핑하고, html 에서 a 링크로 다운로드 구현
    
    [외부폴더위치 다운로드 server.xml](https://www.notion.so/server-xml-39ef53366e9546dabd1e6210fd2460a2) 
    
    ⇒  controller 없이도 작동할 수 있는 방법, 가장 간단하다. parameter도 따로 받을 필요 없다.
    
    ⇒ 로컬에서는 정상작동했으나, 서버 이관시 `파일없음` `404` 로 뜨고 매핑이 안됨
    
    ⇒ 보안 문제였거나, 서버 환경 설정 때문이었을 듯.
    
- **2 TRY** :  context에 /imgs/ 매핑 추가
    
    ⇒ 기본 경로(프로젝트 내부경로)로 자꾸 납치됨. 
    
    ⇒ controller 에서 절대경로 입력해서 파일 가져옴
    
    ⇒ 별도 패턴 생성 (3try)
    
- **3 TRY** :  web.xml 에 패턴 추가 (.img)
    
    ⇒ 최종 경로 : `/imgs/{파일명}.img`
    
    ⇒  **+ 아마 기본 url 경로 패턴이 `*/`   `/*` 이런식으로 다른 문자없이 시작하기 때문에 그랬던듯.**
    
    ⇒ 더 나은 방법은 url 기본 패턴을 전부 수정하는 것이 좋다.
    
    ⇒ 시간관계상 url 패턴에 “뭐로 끝나는지”를 추가 해서 해결했다
    

# CONTEXT.xml

[https://www.notion.so](https://www.notion.so)

- 경로 :  프로젝트 내부 설정 위치
`D:\Project\eGovFrameDev-3.9.0-64bit\workspace\zSurvey\src\main\resources\egovframework\spring`
- 파일명 : context-admin.xml

```sql
<?xml version="1.0" encoding="UTF-8"?>
<beans:beans 
	xmlns="http://www.springframework.org/schema/mvc"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:beans="http://www.springframework.org/schema/beans"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
    	http://www.springframework.org/schema/mvc 
    	http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context.xsd">        
        
        
    <annotation-driven />
    
    <beans:bean id="logInterceptor" class="admin.core.LoginInterceptor"></beans:bean>
    <beans:bean id="loginInterceptor" class="admin.core.LoginInterceptor"></beans:bean>
 
	<interceptors>
		<interceptor>
			<mapping path="/*.do"/>
			<exclude-mapping path="/login.do"/>
			<exclude-mapping path="/loginExcute.do"/>
			<beans:ref bean="logInterceptor"/>
		</interceptor>
		
		<interceptor>
			<mapping path="/*/*.do"/>
			<exclude-mapping path="/admin/login.do"/>
			<exclude-mapping path="/survey/*.do"/>
			<exclude-mapping path="/imgs/x.do"/>
			<beans:ref bean="loginInterceptor"/>
		</interceptor>
	</interceptors>
	
	
	<beans:bean name="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
	        <beans:property name="maxUploadSize" value="10000000"></beans:property> 
	        <beans:property name="maxInMemorySize" value="100000"></beans:property>
	        <beans:property name="uploadTempDir" value="temp"></beans:property>
	        <beans:property name="defaultEncoding" value="utf-8"></beans:property>
	</beans:bean>

	
</beans:beans>
```

# WEB.xml

- 경로 : `D:\survey\apache-tomcat-8.5.71\webapps\zSurvey\WEB-INF`
- 파일명 : WEB.xml

[https://www.notion.so](https://www.notion.so)

```sql
<servlet-mapping>
		<servlet-name>action</servlet-name>
		<url-pattern>*.do</url-pattern>
	</servlet-mapping>
	
	<servlet-mapping>
		<servlet-name>action</servlet-name>
		<url-pattern>*.img</url-pattern>
	</servlet-mapping>
```

# 최종

- 입력 경로(다운로드 주소) : `<a href="/imgs/2021122217510101_0.jpg.img">`
- 패턴 : `/imgs/{파일명}.img`
- controller
    
    ```java
    @RequestMapping(value="/imgs/{fileName}.img", method = RequestMethod.GET , produces = "application/json; charset=utf8")
    	@ResponseBody
    	public byte[] fileDownload(**@PathVariable**("fileName") String fileNm, HttpServletRequest request, HttpServletResponse response) throws IOException {
    		System.out.println(fileNm);
    		String fullName = fileNm;
    		String path = "D:\\sUpload\\";
    		String contentType = "image/png";
    		System.out.println("file path"+path);
    		
    		 //File resource = new File(path, fileName);
    		 File file = new File(path, fullName);
    		 byte[] bytes = FileCopyUtils.copyToByteArray(file);
    		 if (file.exists()) {
    			 String fn = new String(file.getName().getBytes(), "utf-8");
    			response.setHeader("Content-Disposition", "attachment;filename=\"" + fn + "\"");
    			response.setHeader("Content-Type", contentType);
    			response.setContentLength(bytes.length);
    		 } 
    		 return bytes;
    			/*
    		 else {
    			 byte[] nbytes = 000;
    			 return nbytes;*/
    		 }
    ```
    
- 참고링크
    - [Spring] Static Resources 매핑시키기
        
        [[Spring] Static Resources 매핑시키기](https://iwantadmin.tistory.com/133)
        
        [[Spring] Static Resources 매핑시키기](https://iwantadmin.tistory.com/133)
        
    - context, server 추가 설정
        
        [](http://it-archives.com/221422956218/)
        
    - 그 외 외부폴더 접근 방식
        
        [[JAVA] POST 방식으로 파일 다운로드하기.](https://hjink247.tistory.com/26)
        
        [프로젝트 폴더 이외의 외부 폴더 접근](https://ryulstudy.tistory.com/103)
        
    - blob
        
        [blob이란 무엇일까?](https://m.blog.naver.com/PostView.nhn?blogId=magnking&logNo=220950061851&proxyReferer=https:%2F%2Fwww.google.com%2F)
        
    
-