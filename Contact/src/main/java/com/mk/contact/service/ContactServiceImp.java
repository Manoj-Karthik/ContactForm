package com.mk.contact.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mk.contact.dao.ContactDao;
import com.mk.contact.model.Contact;
import com.mk.contact.repository.ContactRepository;

@Service
public class ContactServiceImp implements ContactService {
	
	@Autowired
	private ContactRepository repository;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public ContactDao savecontact(ContactDao contactDao) {
		Contact map = mapper.map(contactDao, Contact.class);
		Contact save = repository.save(map);
		return mapper.map(save, ContactDao.class);
	}

}
