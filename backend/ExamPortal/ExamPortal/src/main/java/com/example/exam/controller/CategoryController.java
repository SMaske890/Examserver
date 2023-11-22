package com.example.exam.controller;


import com.example.exam.model.exam.Category;
import com.example.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
//@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PostMapping("/")
    public ResponseEntity<?> addCategory (@RequestBody Category category){
        Category category1 = this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PutMapping("/")
    public ResponseEntity<?> updateCategory (@RequestBody Category category){
        Category category1 = this.categoryService.updateCategory(category);
        return ResponseEntity.ok(category1);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/{cId}")
    public Category getCategory(@PathVariable("cId") Long cId){
        return this.categoryService.getCategory(cId);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @DeleteMapping("/{cid}")
    public void deleteCategory(@PathVariable("cid") Long cid){
        this.categoryService.deleteCategory(cid);
    }

}
