package amouhal.nouhayla.tpoauth2openid.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import amouhal.nouhayla.tpoauth2openid.model.Course;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/")
public class CourseController {

    private final List<Course> courses = new ArrayList<>();

    public CourseController() {
        courses.add(new Course(1L, "Intro Java", "Bases du langage Java"));
        courses.add(new Course(2L, "Spring Boot", "Créer des APIs avec Spring Boot"));
    }

    @GetMapping("courses")
    @PreAuthorize("hasAnyRole('STUDENT','ADMIN')")
    public List<Course> getCourses() {
        return courses;
    }

    @PostMapping("courses")
    @PreAuthorize("hasRole('ADMIN')")
    public Course addCourse(@RequestBody Course course) {
        course.setId((long) (courses.size() + 1));
        courses.add(course);
        return course;
    }

    @GetMapping("me")
    public Map<String, Object> me(@AuthenticationPrincipal Jwt jwt) {
        return jwt.getClaims();
    }
}
