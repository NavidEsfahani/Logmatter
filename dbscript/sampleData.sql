-- liquibase formatted sql
-- changeset NavidEsfahani:sampleData_Experts (dbms:mysql failOnError:true)


INSERT INTO cv (id,fullname,email,ms_rahnama,ms_moshaver,ms_davar,dr_rahnama,dr_moshaver,dr_davar) VALUES
(1,'Navid', 'eameri@ut.ac.ir',1,1,1,1,1,1);
INSERT INTO cv (id,fullname,email,ms_rahnama,ms_moshaver,ms_davar,dr_rahnama,dr_moshaver,dr_davar) VALUES
(2,'Keyvan', 'ggg@ut.ac.ir',1,1,1,1,1,1);

INSERT INTO cv_book (id,caption,cvid) VALUES
(1,'Java',1);
INSERT INTO cv_book (id,caption,cvid) VALUES
(2,'J2ee',1);
INSERT INTO cv_book (id,caption,cvid) VALUES
(3,'CISCO',2);
INSERT INTO cv_book (id,caption,cvid) VALUES
(4,'SOA',1);



-- rollback DELETE FROM cv_conferences;
-- rollback DELETE FROM cv_book;
-- rollback DELETE FROM cv;



#