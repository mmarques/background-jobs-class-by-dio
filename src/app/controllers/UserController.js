import passwordGenerator from 'password-generator';

import Queue from '../lib/Queue';

export default {
  async store(req, res) {
    const { name, email } = req.body;
    
    console.log('Starting user storage for', email);

    const user = {
      name,
      email,
      password: passwordGenerator(15, false),
    };

    await Queue.add('RegistrationMail', { user });
    
    console.log('Registration mail scheduled for', email);
    console.log('User storage done for', email);

    return res.json(user);
  }
};
