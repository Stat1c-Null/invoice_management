# Path: backend/app/db/models/service.py
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.db import Base


class Service(Base):
    __tablename__ = 'services'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)

    invoice_services = relationship(
        "InvoiceService", cascade="all, delete-orphan", back_populates="service")
