--liquibase formatted sql
--changeset NavidEsfahani:versionControlling (dbms:postgresql failOnError:true splitStatements:false)
CREATE OR REPLACE FUNCTION versionLocking() RETURNS TRIGGER AS $$

BEGIN

  RAISE LOG 'Old version is (%) and new version is (%)', old.version,new.version;

  IF old.version = new.version THEN
    new.version := old.version+1;

  ELSE
    RAISE EXCEPTION 'Optimistic-Locking Exception';

  END IF;
  RETURN new;
END;
$$ LANGUAGE 'plpgsql';




--rollback DELETE FUNCTION IF EXIST versionLocking;
