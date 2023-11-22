package com.example.exam.service;

import com.example.exam.model.exam.Category;
import com.example.exam.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Set;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category addCategory(Category category){
        return this.categoryRepository.save(category);
    }

    public Category updateCategory(Category category){
        return this.categoryRepository.save(category);
    }

    public Set<Category> getCategories(){
        return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    public Category getCategory(Long cId){
        return this.categoryRepository.findById(cId).get();
    }

    public void deleteCategory(Long categoryId){
        this.categoryRepository.deleteById(categoryId);
    }
}
