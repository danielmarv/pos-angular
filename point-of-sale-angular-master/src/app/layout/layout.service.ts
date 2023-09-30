import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  navItems = [
    {
      label: 'Dashboard',
      path: 'dashboard',
      icon: 'dashboard',
      roles: ['admin', 'manager'],
    },
    {
      label: 'Invoices',
      path: 'invoice',
      icon: 'receipt',
      roles: ['admin', 'manager', 'user'],
    },
    {
      label: 'Products',
      path: 'products',
      icon: 'category',
      roles: ['admin', 'manager'],
    },
    {
      label: 'Supplies',
      path: 'supplies',
      icon: 'inventory_2',
      roles: ['admin', 'manager'],
    },
    {
      label: 'Users',
      path: 'manage-users',
      icon: 'people',
      roles: ['admin'],
    },
    {
      label: 'Shifts',
      path: 'shifts',
      icon: 'schedule',
      roles: ['admin', 'manager'],
    },
    {
      label: 'Categories',
      path: 'categories',
      icon: 'category',
      roles: ['admin', 'manager'],
    },
  ];
}
