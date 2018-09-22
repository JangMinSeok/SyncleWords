use synclewords

DROP TABLE WordsList

CREATE TABLE WordsList(
    SN int auto_increment primary key,
    JPN varchar(50) NOT NULL,
    KOR varchar(50) NOT NULL,
    RegisterDate datetime NOT NULL,
    GroupSN int NOT NULL,
    UserID int NOT NULL
)
-- 위 테이블에 유저정보도 넣어줘야함..
ALTER TABLE WordsList ADD INDEX IX_WordsList_JPN (JPN);
ALTER TABLE WordsList ADD INDEX IX_WordsList_KOR (KOR);
ALTER TABLE WordsList ADD INDEX IX_WordsList_UserID (UserID);

--CREATE NONCLUSTERED INDEX IX_WordsList ON dbo.WordsList(JPN)
--CREATE NONCLUSTERED INDEX IX_WordsList ON dbo.WordsList(KOR)

DROP TABLE WordsGroup
CREATE TABLE WordsGroup(
    GroupSN int auto_increment primary key,
	GroupName varchar(24) NOT NULL,
    UserID int NOT NULL
)
ALTER TABLE WordsGroup ADD INDEX IX_WordsGroup_UserID (UserID);

SHOW INDEX FROM WordsList;

insert into WordsGroup values ( 1, "테스트", 1 )
insert into WordsGroup values ( 0, "테스트2", 1 )

insert into WordsList values ( 1, "合え", "테스트", "2018-08-23 00:17", 1, 1 )
insert into WordsList values ( 2, "合", "테스트2",  "2018-08-23 00:18", 1, 1 )
insert into WordsList values ( 0, "合", "테스트2",  "2018-08-23 00:18", 1, 1 )

select * from wordsgroup
select * from wordslist;

DROP PROCEDURE RegisterWord

CREATE PROCEDURE RegisterWord ( IN sJPN varchar(50), IN sKOR varchar(50), IN nUserID INT, IN nGroupSN INT )
	insert into WordsList values ( 0, sJPN, sKOR, NOW(), nGroupSN , nUserID )

DROP PROCEDURE RegisterGroup
CREATE PROCEDURE RegisterGroup ( IN sGroupName varchar(24), IN nUserID INT )
		insert into WordsGroup values ( 0, sGroupName, nUserID )

CREATE PROCEDURE DeleteGroup ( IN nGroupSN INT, IN nUserID INT )
		delete from WordsGroup where UserID = nUserID AND GroupSN = nGroupSN
        
CREATE PROCEDURE ViewGroupWords ( IN nGroupSN INT, IN nUserID INT )
		SELECT * FROM WordsList where UserID = nUserID AND GroupSN = nGroupSN

SET aa 1
SELECT aa

select * from wordslist where jpn like '%테%' OR KOR like '%테%'
    
call RegisterWord ( "合", "테스트2",  1 ) 

SELECT * FROM WordsList WHERE UserID =1 AND JPN LIKE '%테%' OR KOR LIKE '%테%'

CALL ViewGroupWords( 1,1) 


SELECT * FROM WordsList AS A JOIN WordsGroup AS B ON A.GroupSN = B.GroupSN WHERE A.UserID =1 AND A.JPN LIKE '%테%' OR A.KOR LIKE '%테%'