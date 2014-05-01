package com.logmatter.bean.models;


import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Reference;

import java.util.ArrayList;
import java.util.List;

@Entity(noClassnameStored=false)
public class User {
    @Id
    ObjectId id=new ObjectId();
    String name;

    @Reference(ignoreMissing=true)
    List<Matter> matters=new ArrayList<Matter>();


    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Matter> getMatters() {
        return matters;
    }

    public void setMatters(List<Matter> matters) {
        this.matters = matters;
    }
    public void addMatter(Matter matter){
        this.matters.add(matter);

    }
}