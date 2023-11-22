package com.example.exam.model;

import lombok.Builder;

@Builder
public class JwtResponse {
    private String jwtToken;
    private String uname;

    public JwtResponse() {
    }

    public JwtResponse(String jwtToken, String uname) {
        this.jwtToken = jwtToken;
        this.uname = uname;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    @Override
    public String toString() {
        return "JwtResponse{" +
                "jwtToken='" + jwtToken + '\'' +
                ", uname='" + uname + '\'' +
                '}';
    }
}
