#!/usr/bin/env python3
"""
Twilio API Client for PineAI Consulting
Handles SMS, voice calls, and TTS integration with ElevenLabs
"""

import os
import json
import requests
from typing import Dict, List, Optional
from datetime import datetime
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse
from dotenv import load_dotenv

load_dotenv()


class TwilioClient:
    """Twilio client for SMS and voice communications"""
    
    def __init__(self):
        self.account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        self.auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        self.phone_number = os.getenv('TWILIO_PHONE_NUMBER')
        self.elevenlabs_api_key = os.getenv('ELEVENLABS_API_KEY')
        self.elevenlabs_voice_id = os.getenv('ELEVENLABS_VOICE_ID', 'EXAVITQu4vr4xnSDxMaL')
        
        self.client = Client(self.account_sid, self.auth_token)
    
    # SMS Functions
    def send_sms(self, to_number: str, message: str, media_url: Optional[str] = None) -> Dict:
        """Send SMS message"""
        params = {
            'body': message,
            'from_': self.phone_number,
            'to': to_number
        }
        
        if media_url:
            params['media_url'] = [media_url]
        
        message = self.client.messages.create(**params)
        
        return {
            'sid': message.sid,
            'status': message.status,
            'to': message.to,
            'from': message.from_,
            'body': message.body,
            'date_sent': message.date_sent
        }
    
    def send_bulk_sms(self, recipients: List[Dict], message_template: str) -> List[Dict]:
        """Send bulk SMS with personalization"""
        results = []
        
        for recipient in recipients:
            # Personalize message
            message = message_template.format(**recipient)
            
            try:
                result = self.send_sms(recipient['phone'], message)
                results.append({
                    'recipient': recipient,
                    'status': 'success',
                    'sid': result['sid']
                })
            except Exception as e:
                results.append({
                    'recipient': recipient,
                    'status': 'failed',
                    'error': str(e)
                })
        
        return results
    
    def get_sms_history(self, limit: int = 50) -> List[Dict]:
        """Get SMS message history"""
        messages = self.client.messages.list(limit=limit)
        
        return [{
            'sid': msg.sid,
            'from': msg.from_,
            'to': msg.to,
            'body': msg.body,
            'status': msg.status,
            'direction': msg.direction,
            'date_sent': msg.date_sent,
            'price': msg.price
        } for msg in messages]
    
    # Voice Functions
    def make_call(self, to_number: str, twiml_url: str = None, 
                  message: str = None) -> Dict:
        """Make outbound voice call"""
        if message and not twiml_url:
            # Generate TwiML for simple message
            twiml_url = self._create_twiml_bin(message)
        
        call = self.client.calls.create(
            to=to_number,
            from_=self.phone_number,
            url=twiml_url or 'http://demo.twilio.com/docs/voice.xml'
        )
        
        return {
            'sid': call.sid,
            'status': call.status,
            'to': call.to,
            'from': call.from_,
            'duration': call.duration
        }
    
    def _create_twiml_bin(self, message: str) -> str:
        """Create TwiML bin for voice message (simplified - use webhook in production)"""
        # In production, this would create a TwiML bin or use a webhook
        # For now, returning demo URL
        return 'http://demo.twilio.com/docs/voice.xml'
    
    # ElevenLabs TTS Integration
    def generate_tts_audio(self, text: str, output_file: str = None) -> bytes:
        """Generate TTS audio using ElevenLabs"""
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{self.elevenlabs_voice_id}"
        
        headers = {
            'xi-api-key': self.elevenlabs_api_key,
            'Content-Type': 'application/json'
        }
        
        data = {
            'text': text,
            'model_id': 'eleven_monolingual_v1',
            'voice_settings': {
                'stability': 0.5,
                'similarity_boost': 0.5
            }
        }
        
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        
        audio_data = response.content
        
        if output_file:
            with open(output_file, 'wb') as f:
                f.write(audio_data)
        
        return audio_data
    
    def create_voice_message(self, text: str, recipient_number: str) -> Dict:
        """Create and send voice message with TTS"""
        # Generate audio file
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        audio_file = f"/tmp/voice_message_{timestamp}.mp3"
        
        self.generate_tts_audio(text, audio_file)
        
        # Upload to public URL (in production, use S3 or similar)
        # For now, we'll use Twilio's text-to-speech in TwiML
        
        response = VoiceResponse()
        response.say(text, voice='alice')
        
        # Make the call
        return self.make_call(recipient_number, message=text)
    
    # Webhook Handlers
    def handle_incoming_sms(self, from_number: str, body: str) -> str:
        """Handle incoming SMS webhook"""
        # Process the message and return response
        response_text = self._process_sms_command(body)
        
        # Log the interaction
        self._log_interaction({
            'type': 'sms_incoming',
            'from': from_number,
            'body': body,
            'response': response_text,
            'timestamp': datetime.now().isoformat()
        })
        
        return response_text
    
    def _process_sms_command(self, message: str) -> str:
        """Process SMS commands"""
        message_lower = message.lower().strip()
        
        if 'help' in message_lower:
            return "PineAI Help: Reply with STATUS for project status, INVOICE for billing info, or CONTACT to schedule a call."
        elif 'status' in message_lower:
            return "Your project is on track. Next milestone: AI Agent deployment on Monday."
        elif 'invoice' in message_lower:
            return "Your latest invoice (#INV-2025-001) for $3,000 is due on Feb 15. Payment link: pay.pineai.com/abc123"
        elif 'contact' in message_lower:
            return "I'll have someone call you within 2 hours. Or book directly: pineaiconsulting.com/schedule"
        else:
            return "Thanks for your message. Reply HELP for options or visit pineaiconsulting.com"
    
    def _log_interaction(self, interaction_data: Dict):
        """Log interaction for analytics"""
        # In production, this would write to database
        log_file = 'logs/twilio_interactions.jsonl'
        os.makedirs('logs', exist_ok=True)
        
        with open(log_file, 'a') as f:
            f.write(json.dumps(interaction_data) + '\n')
    
    # Utility Functions
    def verify_phone_number(self, phone_number: str) -> Dict:
        """Verify phone number using Twilio Lookup"""
        try:
            phone_info = self.client.lookups.v2.phone_numbers(phone_number).fetch()
            
            return {
                'valid': True,
                'phone_number': phone_info.phone_number,
                'national_format': phone_info.national_format,
                'country_code': phone_info.country_code,
                'carrier': phone_info.carrier.get('name') if phone_info.carrier else None
            }
        except Exception as e:
            return {
                'valid': False,
                'error': str(e)
            }
    
    def get_usage_stats(self) -> Dict:
        """Get usage statistics"""
        # Get current month usage
        usage_records = self.client.usage.records.list(limit=10)
        
        stats = {
            'sms_sent': 0,
            'calls_made': 0,
            'total_cost': 0.0
        }
        
        for record in usage_records:
            if record.category == 'sms-outbound':
                stats['sms_sent'] = record.count
            elif record.category == 'calls-outbound':
                stats['calls_made'] = record.count
            
            if record.price:
                stats['total_cost'] += float(record.price)
        
        return stats


# CLI interface
if __name__ == "__main__":
    import sys
    
    client = TwilioClient()
    
    if len(sys.argv) < 2:
        print("Usage: python twilio_client.py [send_sms|send_voice|verify_number|get_stats]")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "send_sms":
        if len(sys.argv) < 4:
            print("Usage: python twilio_client.py send_sms <to_number> <message>")
            sys.exit(1)
        
        to_number = sys.argv[2]
        message = ' '.join(sys.argv[3:])
        
        result = client.send_sms(to_number, message)
        print(json.dumps(result, indent=2))
    
    elif command == "send_voice":
        if len(sys.argv) < 4:
            print("Usage: python twilio_client.py send_voice <to_number> <message>")
            sys.exit(1)
        
        to_number = sys.argv[2]
        message = ' '.join(sys.argv[3:])
        
        result = client.create_voice_message(message, to_number)
        print(json.dumps(result, indent=2))
    
    elif command == "verify_number":
        if len(sys.argv) < 3:
            print("Usage: python twilio_client.py verify_number <phone_number>")
            sys.exit(1)
        
        phone = sys.argv[2]
        result = client.verify_phone_number(phone)
        print(json.dumps(result, indent=2))
    
    elif command == "get_stats":
        stats = client.get_usage_stats()
        print(json.dumps(stats, indent=2))