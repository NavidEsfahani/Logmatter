package com;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet(name = "Servlet",urlPatterns = "/Servlet")
public class Servlet extends HttpServlet {

    static int counter=1;
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String xsrf = request.getHeader("X-CSRFTOKEN");
        System.out.println("element.html()".hashCode());
        Cookie cookie=new Cookie("csrftoken","1234567");
        cookie.setMaxAge(-1);
        response.addCookie(cookie);
        response.getOutputStream().println("Esteghlal");
        response.getOutputStream().close();
    }
}
