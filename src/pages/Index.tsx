import React, { useState, useEffect } from 'react';
import { User, Shield, Heart, Calendar, Pill, FileText, DollarSign, Users, Phone, LogOut, Plus, Edit, Trash2, Clock, CheckCircle, Download, Upload, ArrowRight, Stethoscope, Activity, Baby, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: string;
  role: string;
  email?: string;
  phone: string;
}

interface Medicine {
  id: string;
  memberId: string;
  memberName: string;
  medicineName: string;
  dosage: string;
  times: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'taken' | 'missed';
}

interface Appointment {
  id: string;
  memberId: string;
  memberName: string;
  type: string;
  title: string;
  date: string;
  time: string;
  notes?: string;
  status: 'upcoming' | 'done';
}

interface EmergencyCard {
  id: string;
  memberId: string;
  memberName: string;
  bloodGroup: string;
  allergies: string;
  conditions: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface Expense {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [emergencyCards, setEmergencyCards] = useState<EmergencyCard[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    role: '' 
  });
  const [familyForm, setFamilyForm] = useState({
    name: '', age: '', gender: '', role: '', email: '', phone: ''
  });
  const [medicineForm, setMedicineForm] = useState({
    memberId: '', medicineName: '', dosage: '', times: [], startDate: '', endDate: ''
  });
  const [appointmentForm, setAppointmentForm] = useState({
    memberId: '', type: '', title: '', date: '', time: '', notes: ''
  });
  const [emergencyForm, setEmergencyForm] = useState({
    memberId: '', bloodGroup: '', allergies: '', conditions: '', emergencyContact: '', emergencyPhone: ''
  });
  const [expenseForm, setExpenseForm] = useState({
    memberId: '', amount: '', date: '', category: '', description: ''
  });

  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [showMemberForm, setShowMemberForm] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('healthpal_user');
    const savedMembers = localStorage.getItem('healthpal_family');
    const savedMedicines = localStorage.getItem('healthpal_medicines');
    const savedAppointments = localStorage.getItem('healthpal_appointments');
    const savedEmergencyCards = localStorage.getItem('healthpal_emergency');
    const savedExpenses = localStorage.getItem('healthpal_expenses');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
    if (savedMembers) setFamilyMembers(JSON.parse(savedMembers));
    if (savedMedicines) setMedicines(JSON.parse(savedMedicines));
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
    if (savedEmergencyCards) setEmergencyCards(JSON.parse(savedEmergencyCards));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Save data to localStorage
  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleDashboardClick = () => {
    if (!currentUser) {
      setCurrentView('register');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const user: User = {
      id: '1',
      email: loginForm.email,
      fullName: 'John Doe',
      role: 'self'
    };

    setCurrentUser(user);
    saveToStorage('healthpal_user', user);
    setCurrentView('dashboard');
    setLoginForm({ email: '', password: '' });
    
    toast({
      title: "Welcome to Pariwar+!",
      description: "Successfully logged in"
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.fullName || !registerForm.email || !registerForm.password || !registerForm.role) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    const user: User = {
      id: '1',
      email: registerForm.email,
      fullName: registerForm.fullName,
      role: registerForm.role
    };

    setCurrentUser(user);
    saveToStorage('healthpal_user', user);
    setCurrentView('dashboard');
    setRegisterForm({ fullName: '', email: '', password: '', confirmPassword: '', role: '' });
    
    toast({
      title: "Welcome to Pariwar+!",
      description: "Account created successfully. Please add your family members to get started."
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('healthpal_user');
    setCurrentView('home');
    setActiveTab('dashboard');
    
    toast({
      title: "Logged out",
      description: "Come back soon!"
    });
  };

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyForm.name || !familyForm.age || !familyForm.gender || !familyForm.role || !familyForm.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: familyForm.name,
      age: parseInt(familyForm.age),
      gender: familyForm.gender,
      role: familyForm.role,
      email: familyForm.email,
      phone: familyForm.phone
    };

    const updatedMembers = [...familyMembers, newMember];
    setFamilyMembers(updatedMembers);
    saveToStorage('healthpal_family', updatedMembers);
    
    setFamilyForm({ name: '', age: '', gender: '', role: '', email: '', phone: '' });
    setShowMemberForm(false);
    
    toast({
      title: "Family Member Added",
      description: `${newMember.name} has been added to your family`
    });
  };

  const handleEditFamilyMember = (member: FamilyMember) => {
    setFamilyForm({
      name: member.name,
      age: member.age.toString(),
      gender: member.gender,
      role: member.role,
      email: member.email || '',
      phone: member.phone
    });
    setEditingMember(member.id);
    setShowMemberForm(true);
  };

  const handleUpdateFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    const updatedMembers = familyMembers.map(member => 
      member.id === editingMember 
        ? {
            ...member,
            name: familyForm.name,
            age: parseInt(familyForm.age),
            gender: familyForm.gender,
            role: familyForm.role,
            email: familyForm.email,
            phone: familyForm.phone
          }
        : member
    );

    setFamilyMembers(updatedMembers);
    saveToStorage('healthpal_family', updatedMembers);
    
    setFamilyForm({ name: '', age: '', gender: '', role: '', email: '', phone: '' });
    setEditingMember(null);
    setShowMemberForm(false);
    
    toast({
      title: "Member Updated",
      description: "Family member information has been updated"
    });
  };

  const handleDeleteFamilyMember = (id: string) => {
    const updatedMembers = familyMembers.filter(member => member.id !== id);
    setFamilyMembers(updatedMembers);
    saveToStorage('healthpal_family', updatedMembers);
    
    toast({
      title: "Member Removed",
      description: "Family member has been removed"
    });
  };

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineForm.memberId || !medicineForm.medicineName || !medicineForm.dosage || !medicineForm.startDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const member = familyMembers.find(m => m.id === medicineForm.memberId);
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      memberId: medicineForm.memberId,
      memberName: member?.name || '',
      medicineName: medicineForm.medicineName,
      dosage: medicineForm.dosage,
      times: medicineForm.times,
      startDate: medicineForm.startDate,
      endDate: medicineForm.endDate,
      status: 'active'
    };

    const updatedMedicines = [...medicines, newMedicine];
    setMedicines(updatedMedicines);
    saveToStorage('healthpal_medicines', updatedMedicines);
    
    setMedicineForm({ memberId: '', medicineName: '', dosage: '', times: [], startDate: '', endDate: '' });
    
    toast({
      title: "Medicine Added",
      description: `${newMedicine.medicineName} reminder set for ${member?.name}`
    });
  };

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentForm.memberId || !appointmentForm.type || !appointmentForm.title || !appointmentForm.date || !appointmentForm.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const member = familyMembers.find(m => m.id === appointmentForm.memberId);
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      memberId: appointmentForm.memberId,
      memberName: member?.name || '',
      type: appointmentForm.type,
      title: appointmentForm.title,
      date: appointmentForm.date,
      time: appointmentForm.time,
      notes: appointmentForm.notes,
      status: 'upcoming'
    };

    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    saveToStorage('healthpal_appointments', updatedAppointments);
    
    setAppointmentForm({ memberId: '', type: '', title: '', date: '', time: '', notes: '' });
    
    toast({
      title: "Appointment Added",
      description: `${newAppointment.title} scheduled for ${member?.name}`
    });
  };

  const handleAddEmergencyCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emergencyForm.memberId || !emergencyForm.bloodGroup || !emergencyForm.emergencyContact || !emergencyForm.emergencyPhone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const member = familyMembers.find(m => m.id === emergencyForm.memberId);
    const newCard: EmergencyCard = {
      id: Date.now().toString(),
      memberId: emergencyForm.memberId,
      memberName: member?.name || '',
      bloodGroup: emergencyForm.bloodGroup,
      allergies: emergencyForm.allergies,
      conditions: emergencyForm.conditions,
      emergencyContact: emergencyForm.emergencyContact,
      emergencyPhone: emergencyForm.emergencyPhone
    };

    const updatedCards = [...emergencyCards, newCard];
    setEmergencyCards(updatedCards);
    saveToStorage('healthpal_emergency', updatedCards);
    
    setEmergencyForm({ memberId: '', bloodGroup: '', allergies: '', conditions: '', emergencyContact: '', emergencyPhone: '' });
    
    toast({
      title: "Emergency Card Created",
      description: `Emergency card created for ${member?.name}`
    });
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.memberId || !expenseForm.amount || !expenseForm.date || !expenseForm.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const member = familyMembers.find(m => m.id === expenseForm.memberId);
    const newExpense: Expense = {
      id: Date.now().toString(),
      memberId: expenseForm.memberId,
      memberName: member?.name || '',
      amount: parseFloat(expenseForm.amount),
      date: expenseForm.date,
      category: expenseForm.category,
      description: expenseForm.description
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveToStorage('healthpal_expenses', updatedExpenses);
    
    setExpenseForm({ memberId: '', amount: '', date: '', category: '', description: '' });
    
    toast({
      title: "Expense Added",
      description: `₹${newExpense.amount} expense added for ${member?.name}`
    });
  };

  const markMedicineAsTaken = (id: string) => {
    const updatedMedicines = medicines.map(med => 
      med.id === id ? { ...med, status: 'taken' as const } : med
    );
    setMedicines(updatedMedicines);
    saveToStorage('healthpal_medicines', updatedMedicines);
    
    toast({
      title: "Medicine Marked",
      description: "Medicine marked as taken"
    });
  };

  const markAppointmentAsDone = (id: string) => {
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'done' as const } : apt
    );
    setAppointments(updatedAppointments);
    saveToStorage('healthpal_appointments', updatedAppointments);
    
    toast({
      title: "Appointment Completed",
      description: "Appointment marked as done"
    });
  };

  // Render Home Page
  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg mr-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Pariwar+
                  </h1>
                  <p className="text-xs text-gray-500">Smart Health for Every Family</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentView('login')}
                  className="border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
                <Button 
                  onClick={handleDashboardClick}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                    Smart Family Health
                    <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                      Tracker & Reminder
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Keep your entire family healthy with our comprehensive health management system. 
                    Track medications, appointments, and medical history all in one place.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    onClick={handleDashboardClick}
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-3"
                  >
                    Start Managing Health
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => setCurrentView('login')}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
                  >
                    I Have an Account
                  </Button>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    Secure & Private
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    Family Friendly
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-purple-500" />
                    Smart Reminders
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
                    alt="Happy family with health technology"
                    className="rounded-2xl shadow-lg w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Family Health</p>
                      <p className="text-sm text-gray-500">Always Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything Your Family Needs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive health management tools designed for modern families
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Family Management</CardTitle>
                  <CardDescription>
                    Add and manage all family members in one centralized dashboard
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Pill className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Medicine Reminders</CardTitle>
                  <CardDescription>
                    Never miss a dose with smart medication tracking and alerts
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Appointments</CardTitle>
                  <CardDescription>
                    Schedule and track doctor visits, vaccinations, and checkups
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Emergency Cards</CardTitle>
                  <CardDescription>
                    Digital health cards with critical medical information
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">Document Storage</CardTitle>
                  <CardDescription>
                    Securely store and organize medical reports and prescriptions
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardHeader>
                  <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <DollarSign className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">Expense Tracking</CardTitle>
                  <CardDescription>
                    Monitor and manage medical expenses for budgeting
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Family's Health?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of families who trust Pariwar+ for their health management needs
            </p>
            <Button 
              size="lg"
              onClick={handleDashboardClick}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
            >
              Get Started Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg mr-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Pariwar+</span>
              </div>
              <p className="text-gray-400">Smart Health for Every Family</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Render Login Page
  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl mr-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Pariwar+
                </h1>
                <p className="text-xs text-gray-500">Smart Health for Every Family</p>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-base">Sign in to your family health account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="Enter your email"
                  className="mt-1 h-11"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter your password"
                  className="mt-1 h-11"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-base font-medium"
              >
                Sign In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setCurrentView('register')}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Create Account
                </button>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                If your email is linked to a family account, you can log in directly!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render Register Page
  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl mr-3">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Pariwar+
                  </h1>
                  <p className="text-xs text-gray-500">Smart Health for Every Family</p>
                </div>
              </div>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription className="text-base">
                Start managing your family's health today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-5">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className="mt-1 h-11"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="Enter your email"
                    className="mt-1 h-11"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="Create a password"
                    className="mt-1 h-11"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="mt-1 h-11"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="text-sm font-medium">Your Role</Label>
                  <Select value={registerForm.role} onValueChange={(value) => setRegisterForm({ ...registerForm, role: value })}>
                    <SelectTrigger className="mt-1 h-11">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self">Self</SelectItem>
                      <SelectItem value="mother">Mother</SelectItem>
                      <SelectItem value="father">Father</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="grandparent">Grandparent</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-base font-medium"
                >
                  Create Account
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setCurrentView('login')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg mr-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Pariwar+
                </h1>
                <p className="text-xs text-gray-500">Smart Health for Every Family</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <span className="text-sm text-gray-600">
                  Welcome back, <span className="font-medium text-gray-900">{currentUser?.fullName}</span>!
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs with enhanced styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-white shadow-sm border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Dashboard</TabsTrigger>
            <TabsTrigger value="family" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Family</TabsTrigger>
            <TabsTrigger value="medicines" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Medicines</TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Appointments</TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Documents</TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Emergency</TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Expenses</TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-green-600 data-[state=active]:text-white">Timeline</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab with prompt to add family members */}
          <TabsContent value="dashboard">
            {familyMembers.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserPlus className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Pariwar+</h3>
                  <p className="text-gray-600 mb-8">
                    Start by adding your family members to begin managing everyone's health in one place.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('family')}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Add Your First Family Member
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('family')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Family Members</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{familyMembers.length}</div>
                    <p className="text-xs text-muted-foreground">Total family members</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('medicines')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Medicines</CardTitle>
                    <Pill className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{medicines.filter(m => m.status === 'active').length}</div>
                    <p className="text-xs text-muted-foreground">Ongoing treatments</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('appointments')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{appointments.filter(a => a.status === 'upcoming').length}</div>
                    <p className="text-xs text-muted-foreground">Scheduled visits</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab('expenses')}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                    <DollarSign className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">Total medical costs</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Quick Actions */}
            {familyMembers.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={() => setActiveTab('family')} 
                    className="h-16 flex flex-col items-center justify-center space-y-2"
                    variant="outline"
                  >
                    <Users className="h-6 w-6" />
                    <span>Add Family Member</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('medicines')} 
                    className="h-16 flex flex-col items-center justify-center space-y-2"
                    variant="outline"
                  >
                    <Pill className="h-6 w-6" />
                    <span>Set Medicine Reminder</span>
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('appointments')} 
                    className="h-16 flex flex-col items-center justify-center space-y-2"
                    variant="outline"
                  >
                    <Calendar className="h-6 w-6" />
                    <span>Schedule Appointment</span>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Family Management Tab */}
          <TabsContent value="family">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Family Members</h2>
                  <p className="text-gray-600 mt-1">Manage your family's health profiles</p>
                </div>
                <Button 
                  onClick={() => setShowMemberForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              {showMemberForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>{editingMember ? 'Edit' : 'Add'} Family Member</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={editingMember ? handleUpdateFamilyMember : handleAddFamilyMember} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={familyForm.name}
                            onChange={(e) => setFamilyForm({ ...familyForm, name: e.target.value })}
                            placeholder="Enter name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="age">Age *</Label>
                          <Input
                            id="age"
                            type="number"
                            value={familyForm.age}
                            onChange={(e) => setFamilyForm({ ...familyForm, age: e.target.value })}
                            placeholder="Enter age"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="gender">Gender *</Label>
                          <Select value={familyForm.gender} onValueChange={(value) => setFamilyForm({ ...familyForm, gender: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="role">Role *</Label>
                          <Select value={familyForm.role} onValueChange={(value) => setFamilyForm({ ...familyForm, role: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="self">Self</SelectItem>
                              <SelectItem value="mother">Mother</SelectItem>
                              <SelectItem value="father">Father</SelectItem>
                              <SelectItem value="child">Child</SelectItem>
                              <SelectItem value="grandparent">Grandparent</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={familyForm.email}
                            onChange={(e) => setFamilyForm({ ...familyForm, email: e.target.value })}
                            placeholder="Enter email (optional)"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            value={familyForm.phone}
                            onChange={(e) => setFamilyForm({ ...familyForm, phone: e.target.value })}
                            placeholder="Enter phone number"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit">{editingMember ? 'Update' : 'Add'} Member</Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setShowMemberForm(false);
                            setEditingMember(null);
                            setFamilyForm({ name: '', age: '', gender: '', role: '', email: '', phone: '' });
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {familyMembers.map((member) => (
                  <Card key={member.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>
                            {member.role} • {member.age} years • {member.gender}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditFamilyMember(member)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteFamilyMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {member.email && (
                          <div className="flex items-center">
                            <span className="font-medium">Email:</span>
                            <span className="ml-2">{member.email}</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{member.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Medicines Tab */}
          <TabsContent value="medicines">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medicine Reminders</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Add Medicine Reminder</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddMedicine} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="memberId">Family Member *</Label>
                        <Select value={medicineForm.memberId} onValueChange={(value) => setMedicineForm({ ...medicineForm, memberId: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member" />
                          </SelectTrigger>
                          <SelectContent>
                            {familyMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="medicineName">Medicine Name *</Label>
                        <Input
                          id="medicineName"
                          value={medicineForm.medicineName}
                          onChange={(e) => setMedicineForm({ ...medicineForm, medicineName: e.target.value })}
                          placeholder="Enter medicine name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dosage">Dosage *</Label>
                        <Input
                          id="dosage"
                          value={medicineForm.dosage}
                          onChange={(e) => setMedicineForm({ ...medicineForm, dosage: e.target.value })}
                          placeholder="e.g., 2 tablets"
                          required
                        />
                      </div>
                      <div>
                        <Label>Times of Day</Label>
                        <div className="flex space-x-4 mt-2">
                          {['Morning', 'Afternoon', 'Night'].map((time) => (
                            <label key={time} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={medicineForm.times.includes(time)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setMedicineForm({ 
                                      ...medicineForm, 
                                      times: [...medicineForm.times, time] 
                                    });
                                  } else {
                                    setMedicineForm({ 
                                      ...medicineForm, 
                                      times: medicineForm.times.filter(t => t !== time) 
                                    });
                                  }
                                }}
                              />
                              <span>{time}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="startDate">Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={medicineForm.startDate}
                          onChange={(e) => setMedicineForm({ ...medicineForm, startDate: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={medicineForm.endDate}
                          onChange={(e) => setMedicineForm({ ...medicineForm, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button type="submit">Add Reminder</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {medicines.map((medicine) => (
                  <Card key={medicine.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{medicine.medicineName}</h3>
                          <p className="text-sm text-gray-600">
                            <strong>Patient:</strong> {medicine.memberName} | 
                            <strong> Dosage:</strong> {medicine.dosage}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Times:</strong> {medicine.times.join(', ')} | 
                            <strong> Duration:</strong> {medicine.startDate} to {medicine.endDate || 'Ongoing'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={medicine.status === 'taken' ? 'default' : medicine.status === 'active' ? 'secondary' : 'destructive'}>
                            {medicine.status}
                          </Badge>
                          {medicine.status === 'active' && (
                            <Button
                              size="sm"
                              onClick={() => markMedicineAsTaken(medicine.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Taken
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Appointments & Vaccinations</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Schedule Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddAppointment} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="memberId">Family Member *</Label>
                        <Select value={appointmentForm.memberId} onValueChange={(value) => setAppointmentForm({ ...appointmentForm, memberId: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member" />
                          </SelectTrigger>
                          <SelectContent>
                            {familyMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="type">Appointment Type *</Label>
                        <Select value={appointmentForm.type} onValueChange={(value) => setAppointmentForm({ ...appointmentForm, type: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor Visit</SelectItem>
                            <SelectItem value="lab">Lab Test</SelectItem>
                            <SelectItem value="vaccine">Vaccination</SelectItem>
                            <SelectItem value="checkup">Health Checkup</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={appointmentForm.title}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, title: e.target.value })}
                          placeholder="e.g., Dr. Smith checkup"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={appointmentForm.date}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={appointmentForm.time}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          value={appointmentForm.notes}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                          placeholder="Additional notes"
                        />
                      </div>
                    </div>
                    <Button type="submit">Schedule Appointment</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className={appointment.status === 'upcoming' ? 'border-green-200 bg-green-50' : ''}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{appointment.title}</h3>
                          <p className="text-sm text-gray-600">
                            <strong>Patient:</strong> {appointment.memberName} | 
                            <strong> Type:</strong> {appointment.type}
                          </p>
                          <p className="text-sm text-gray-600">
                            <Clock className="inline h-4 w-4 mr-1" />
                            {appointment.date} at {appointment.time}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600">
                              <strong>Notes:</strong> {appointment.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                            {appointment.status}
                          </Badge>
                          {appointment.status === 'upcoming' && (
                            <Button
                              size="sm"
                              onClick={() => markAppointmentAsDone(appointment.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Done
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medical Documents</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upload Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="member">Family Member</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member" />
                          </SelectTrigger>
                          <SelectContent>
                            {familyMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="docType">Document Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prescription">Prescription</SelectItem>
                            <SelectItem value="lab-report">Lab Report</SelectItem>
                            <SelectItem value="bill">Medical Bill</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="file">Upload File</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input type="file" className="sr-only" accept=".pdf,.jpg,.jpeg,.png" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Document Library</CardTitle>
                  <CardDescription>Your uploaded medical documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="mx-auto h-12 w-12 mb-4" />
                    <p>No documents uploaded yet</p>
                    <p className="text-sm">Upload your first medical document above</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Emergency Cards Tab */}
          <TabsContent value="emergency">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Emergency Health Cards</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Create Emergency Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddEmergencyCard} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="memberId">Family Member *</Label>
                        <Select value={emergencyForm.memberId} onValueChange={(value) => setEmergencyForm({ ...emergencyForm, memberId: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member" />
                          </SelectTrigger>
                          <SelectContent>
                            {familyMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="bloodGroup">Blood Group *</Label>
                        <Select value={emergencyForm.bloodGroup} onValueChange={(value) => setEmergencyForm({ ...emergencyForm, bloodGroup: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="allergies">Allergies</Label>
                        <Input
                          id="allergies"
                          value={emergencyForm.allergies}
                          onChange={(e) => setEmergencyForm({ ...emergencyForm, allergies: e.target.value })}
                          placeholder="e.g., Penicillin, Nuts"
                        />
                      </div>
                      <div>
                        <Label htmlFor="conditions">Chronic Conditions</Label>
                        <Input
                          id="conditions"
                          value={emergencyForm.conditions}
                          onChange={(e) => setEmergencyForm({ ...emergencyForm, conditions: e.target.value })}
                          placeholder="e.g., Diabetes, Hypertension"
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                        <Input
                          id="emergencyContact"
                          value={emergencyForm.emergencyContact}
                          onChange={(e) => setEmergencyForm({ ...emergencyForm, emergencyContact: e.target.value })}
                          placeholder="Contact person name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                        <Input
                          id="emergencyPhone"
                          value={emergencyForm.emergencyPhone}
                          onChange={(e) => setEmergencyForm({ ...emergencyForm, emergencyPhone: e.target.value })}
                          placeholder="Contact phone number"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit">Generate Emergency Card</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyCards.map((card) => (
                  <Card key={card.id} className="border-red-200">
                    <CardHeader className="bg-red-50">
                      <CardTitle className="text-red-800 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Emergency Health Card
                      </CardTitle>
                      <CardDescription className="text-red-600">
                        {card.memberName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-6">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Blood Group:</span>
                          <div className="text-lg font-bold text-red-600">{card.bloodGroup}</div>
                        </div>
                        <div>
                          <span className="font-medium">Emergency Contact:</span>
                          <div>{card.emergencyContact}</div>
                          <div className="text-blue-600">{card.emergencyPhone}</div>
                        </div>
                      </div>
                      {card.allergies && (
                        <div className="text-sm">
                          <span className="font-medium">Allergies:</span>
                          <div className="text-red-600">{card.allergies}</div>
                        </div>
                      )}
                      {card.conditions && (
                        <div className="text-sm">
                          <span className="font-medium">Conditions:</span>
                          <div>{card.conditions}</div>
                        </div>
                      )}
                      <div className="pt-4 border-t">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medical Expenses</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Add Expense</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddExpense} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="memberId">Family Member *</Label>
                        <Select value={expenseForm.memberId} onValueChange={(value) => setExpenseForm({ ...expenseForm, memberId: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member" />
                          </SelectTrigger>
                          <SelectContent>
                            {familyMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="amount">Amount *</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={expenseForm.amount}
                          onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={expenseForm.date}
                          onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={expenseForm.category} onValueChange={(value) => setExpenseForm({ ...expenseForm, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="doctor">Doctor Visit</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="lab">Lab Test</SelectItem>
                            <SelectItem value="hospital">Hospital</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={expenseForm.description}
                          onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                          placeholder="Brief description"
                        />
                      </div>
                    </div>
                    <Button type="submit">Add Expense</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expense Summary</CardTitle>
                  <CardDescription>
                    Total Monthly Expenses: ₹{expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{expense.memberName}</h4>
                          <p className="text-sm text-gray-600">{expense.category} • {expense.date}</p>
                          {expense.description && (
                            <p className="text-sm text-gray-500">{expense.description}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">₹{expense.amount.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                    {expenses.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <DollarSign className="mx-auto h-12 w-12 mb-4" />
                        <p>No expenses recorded yet</p>
                        <p className="text-sm">Add your first medical expense above</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medical History Timeline</h2>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    {familyMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>{member.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Health Timeline</CardTitle>
                  <CardDescription>Comprehensive view of medical events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Timeline items would be generated from medicines, appointments, etc. */}
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="mx-auto h-12 w-12 mb-4" />
                      <p>Timeline view coming soon</p>
                      <p className="text-sm">This will show a chronological view of all health events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
