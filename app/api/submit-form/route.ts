import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Basic validation - ensure required fields are present
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      return NextResponse.json(
        { error: 'Informations personnelles manquantes' },
        { status: 400 }
      );
    }

    // Create transporter for Microsoft 365
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: true,
      auth: {
        user: 'wiam@shape-it.ma',
        pass: 'v8bi~A_Da8SWRRQ'
      }
    });

    // Format goal labels
    const goalLabels = {
      "weight-loss": "Perte de Poids",
      "muscle-gain": "Prendre du Muscle",
      "energy": "Plus d'énergie et de productivité",
      "confidence": "Reprendre Confiance en soi",
      "stress": "Réduire le Stress",
      "posture": "Améliorer sa posture et sa santé",
      "sleep": "Améliorer son Sommeil"
    };

    // Format source labels
    const sourceLabels = {
      "facebook-ads": "PUB Facebook/Instagram",
      "social": "Facebook/Instagram",
      "google-ads": "Annonce Google",
      "google-search": "Recherche Google",
      "word-of-mouth": "Bouche à Oreille"
    };

    // Format center labels
    const centerLabels = {
      "ain-diab": "SHAPE IT, Ain Diab, Casablanca",
      "need-info": "Besoin d'informations sur la localisation"
    };

    // Get coach preference in French
    let coachPreference = "Pas spécifié";
    if (formData.coachGender === "female") coachPreference = "Une femme";
    else if (formData.coachGender === "male") coachPreference = "Un homme";
    else if (formData.coachGender === "any") coachPreference = "Peu importe";

    // Format goals for display
    const formattedGoals = formData.goals.map((goal: string) => goalLabels[goal as keyof typeof goalLabels] || goal).join(', ');

    // Get source label
    const sourceLabel = sourceLabels[formData.source as keyof typeof sourceLabels] || formData.source;

    // Get center label
    const centerLabel = centerLabels[formData.center as keyof typeof centerLabels] || formData.center;

    // Format the HTML for email
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 5px;">
      <h1 style="color: #847B72; text-align: center; margin-bottom: 30px;">Nouvelle demande de Bilan Forme</h1>
      
      <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #847B72; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Informations personnelles</h2>
        <p><strong>Nom complet:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        <p><strong>Téléphone:</strong> ${formData.countryCode} ${formData.phone}</p>
        <p><strong>Date de naissance:</strong> ${formData.birthDate.day}/${formData.birthDate.month}/${formData.birthDate.year}</p>
      </div>
      
      <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="color: #847B72; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Préférences</h2>
        <p><strong>Centre:</strong> ${centerLabel}</p>
        <p><strong>Objectifs:</strong> ${formattedGoals || "Non spécifié"}</p>
        <p><strong>Préférence de coach:</strong> ${coachPreference}</p>
        <p><strong>Source:</strong> ${sourceLabel || "Non spécifié"}</p>
      </div>
      
      <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px;">
        <p><strong>Date de soumission:</strong> ${new Date(formData.submittedAt).toLocaleString('fr-FR')}</p>
      </div>
      
      <p style="text-align: center; margin-top: 30px; color: #847B72; font-size: 12px;">
        Cette demande a été envoyée automatiquement depuis le formulaire de contact de Shape It.
      </p>
    </div>
    `;

    // Format the plain text for email
    const textContent = `
Nouvelle demande de Bilan Forme

INFORMATIONS PERSONNELLES
-------------------------
Nom complet: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Téléphone: ${formData.countryCode} ${formData.phone}
Date de naissance: ${formData.birthDate.day}/${formData.birthDate.month}/${formData.birthDate.year}

PRÉFÉRENCES
-----------
Centre: ${centerLabel}
Objectifs: ${formattedGoals || "Non spécifié"}
Préférence de coach: ${coachPreference}
Source: ${sourceLabel || "Non spécifié"}

Date de soumission: ${new Date(formData.submittedAt).toLocaleString('fr-FR')}
`;

    // Send email to staff
    const emailResult = await transporter.sendMail({
      from: 'Shape It <info@shape-it.ma>',
      to: 'wiam@shape-it.ma',
      subject: `Nouvelle demande de Bilan Forme - ${formData.firstName} ${formData.lastName}`,
      text: textContent,
      html: htmlContent
    });

    if (!emailResult.messageId) {
      throw new Error('Failed to send email');
    }

    return NextResponse.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Échec de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
} 