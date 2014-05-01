package com;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.logmatter.bean.models.User;
import com.logmatter.business.UserLogic;
import com.mongodb.MongoClient;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;


@Singleton
public class Servlet extends HttpServlet {

    @Inject Datastore ds;

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

       User user = new User();
       user.setName("Navssid");

       user = ds.find(User.class, "name", "Navid").get();
       response.getOutputStream().println(user.getName());

    }
}
