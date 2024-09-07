package com.mk.contact.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mk.contact.dao.ContactDao;
import com.mk.contact.service.ContactService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/contact")
public class ContactController {

	@Autowired
	private ContactService service;
	
	@PostMapping("/save")
	public ResponseEntity<ContactDao> saveContact(@RequestBody ContactDao contactDao){
		ContactDao save = service.savecontact(contactDao);
		return new ResponseEntity<>(save,HttpStatus.OK);
	}
}
