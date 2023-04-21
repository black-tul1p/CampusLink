import { getCourseDetailsById } from "./course";
import {getDoc} from "@firebase/firestore";
import emailjs from '@emailjs/browser';

const serviceId = "service_8auridc";
const templateId = "template_zbe0r5e";
const publicKey = "Of10TcfLMvXkg7r62";

export async function sendAnnouncementNotification(title, description, courseId) {
    const courseDetails = await getCourseDetailsById(courseId);
    const students = await Promise.all(courseDetails.enrolledStudents.map(getDoc));
    const recipientEmails = students.map((s) => s.data().email);
    console.log(recipientEmails);

    recipientEmails.forEach(email => {
        const templateParams = {
            recipient: email,
            title: title,
            course: courseDetails.courseTitle + " " + courseDetails.courseId,
            message: description
        };
        emailjs.send(serviceId, templateId, templateParams, publicKey)
    })
}